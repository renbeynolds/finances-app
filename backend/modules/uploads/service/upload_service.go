package service

import (
	"context"
	"encoding/csv"
	"fmt"
	"strings"
	"time"

	"github.com/araddon/dateparse"
	"github.com/expr-lang/expr"
	"github.com/renbeynolds/finances-app/database/entities"
	bankingRepository "github.com/renbeynolds/finances-app/modules/banking/repository"
	categoryRepository "github.com/renbeynolds/finances-app/modules/categories/repository"
	transactionRepository "github.com/renbeynolds/finances-app/modules/transactions/repository"
	"github.com/renbeynolds/finances-app/modules/uploads/dto"
	"github.com/renbeynolds/finances-app/modules/uploads/repository"
	"github.com/renbeynolds/finances-app/pkg/utils"
	"gorm.io/gorm"
)

type UploadService interface {
	CreateUpload(ctx context.Context, req dto.CreateUploadRequest) (dto.UploadResponse, error)
	GetAllUploads(ctx context.Context) ([]dto.UploadResponse, error)
}

type uploadService struct {
	uploadRepository      repository.UploadRepository
	bankAccountRepository bankingRepository.BankAccountRepository
	categoryRepository    categoryRepository.CategoryRepository
	transactionRepository transactionRepository.TransactionRepository
	db                    *gorm.DB
}

func NewUploadService(
	uploadRepo repository.UploadRepository,
	bankAccountRepo bankingRepository.BankAccountRepository,
	categoryRepo categoryRepository.CategoryRepository,
	transactionRepo transactionRepository.TransactionRepository,
	db *gorm.DB,
) UploadService {
	return &uploadService{
		uploadRepository:      uploadRepo,
		bankAccountRepository: bankAccountRepo,
		categoryRepository:    categoryRepo,
		transactionRepository: transactionRepo,
		db:                    db,
	}
}

func (s *uploadService) CreateUpload(ctx context.Context, req dto.CreateUploadRequest) (dto.UploadResponse, error) {
	// Start database transaction
	tx := s.db.Begin()
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()

	// Get bank account details
	account, err := s.bankAccountRepository.GetBankAccountByID(ctx, tx, req.BankAccountID)
	if err != nil {
		tx.Rollback()
		return dto.UploadResponse{}, fmt.Errorf("error finding bank account: %v", err)
	}

	// Get all categories for matching
	categories, err := s.categoryRepository.GetAllCategories(ctx, tx)
	if err != nil {
		tx.Rollback()
		return dto.UploadResponse{}, fmt.Errorf("error fetching categories: %v", err)
	}

	// Open and read CSV file
	fileContent, err := req.CSV.Open()
	if err != nil {
		tx.Rollback()
		return dto.UploadResponse{}, fmt.Errorf("error opening file: %v", err)
	}
	defer fileContent.Close()

	csvReader := csv.NewReader(fileContent)
	csvReader.FieldsPerRecord = -1 // Allow variable number of fields
	records, err := csvReader.ReadAll()
	if err != nil {
		tx.Rollback()
		return dto.UploadResponse{}, fmt.Errorf("error reading CSV file: %v", err)
	}

	// Parse CSV into map structure
	csvData := utils.ParseCSV(records)
	if len(csvData) == 0 {
		tx.Rollback()
		return dto.UploadResponse{}, fmt.Errorf("no data found in CSV file")
	}

	// Create upload entity first
	upload := entities.Upload{
		BankAccountID: req.BankAccountID,
	}

	createdUpload, err := s.uploadRepository.CreateUpload(ctx, tx, upload)
	if err != nil {
		tx.Rollback()
		return dto.UploadResponse{}, fmt.Errorf("error creating upload: %v", err)
	}

	// Process transactions (in reverse order to maintain chronological balance calculation)
	var transactions []entities.Transaction
	currentBalance := account.Balance

	for idx := len(csvData) - 1; idx >= 0; idx-- {
		record := csvData[idx]

		// Create transaction
		transaction := entities.Transaction{
			UploadID:    createdUpload.ID,
			Description: record[account.DescriptionHeader],
		}

		// Parse date
		date, err := dateparse.ParseLocal(record[account.DateHeader])
		if err != nil {
			tx.Rollback()
			return dto.UploadResponse{}, fmt.Errorf("error parsing date %s: %v", record[account.DateHeader], err)
		}
		transaction.Date = date

		// Parse amount using expression
		amount, err := s.getTransactionAmount(account.AmountExpression, record)
		if err != nil {
			tx.Rollback()
			return dto.UploadResponse{}, fmt.Errorf("error parsing amount: %v", err)
		}
		transaction.Amount = amount

		// Match category using prefix rules
		category := s.getTransactionCategory(categories, account, record)
		if category != nil {
			transaction.CategoryID = &category.ID
		}

		// Calculate balance
		currentBalance += transaction.Amount
		transaction.Balance = currentBalance

		transactions = append(transactions, transaction)
	}

	// Bulk insert transactions
	if len(transactions) > 0 {
		if err := s.transactionRepository.BulkCreateTransactions(ctx, tx, transactions); err != nil {
			tx.Rollback()
			return dto.UploadResponse{}, fmt.Errorf("error creating transactions: %v", err)
		}
	}

	// Update bank account balance
	account.Balance = currentBalance
	if _, err := s.bankAccountRepository.UpdateBankAccount(ctx, tx, account); err != nil {
		tx.Rollback()
		return dto.UploadResponse{}, fmt.Errorf("error updating bank account balance: %v", err)
	}

	// Commit transaction
	if err := tx.Commit().Error; err != nil {
		return dto.UploadResponse{}, fmt.Errorf("error committing transaction: %v", err)
	}

	return entityToResponse(createdUpload), nil
}

func (s *uploadService) GetAllUploads(ctx context.Context) ([]dto.UploadResponse, error) {
	uploads, err := s.uploadRepository.GetAllUploads(ctx, s.db)
	if err != nil {
		return nil, err
	}

	var uploadResponses []dto.UploadResponse
	for _, upload := range uploads {
		uploadResponses = append(uploadResponses, entityToResponse(upload))
	}

	return uploadResponses, nil
}

func entityToResponse(upload entities.Upload) dto.UploadResponse {
	return dto.UploadResponse{
		ID:        upload.ID,
		CreatedAt: upload.CreatedAt.Format(time.RFC3339),
	}
}

// getTransactionAmount evaluates the amount expression and returns the amount in cents
func (s *uploadService) getTransactionAmount(amountExpression string, record map[string]string) (int64, error) {
	program, err := expr.Compile(amountExpression, expr.Env(record), expr.Function("ParseMoney", func(params ...any) (any, error) {
		return utils.ParseMoney(params[0].(string))
	}, utils.ParseMoney))
	if err != nil {
		return 0, fmt.Errorf("error compiling expression: %v", err)
	}

	output, err := expr.Run(program, record)
	if err != nil {
		return 0, fmt.Errorf("error running expression: %v", err)
	}

	// Handle different numeric types
	switch v := output.(type) {
	case int64:
		return v, nil
	case int:
		return int64(v), nil
	case float64:
		return int64(v), nil
	default:
		return 0, fmt.Errorf("amount expression result is not a number: %T", output)
	}
}

// getTransactionCategory matches a transaction to a category using prefix rules
func (s *uploadService) getTransactionCategory(categories []entities.Category, account entities.BankAccount, record map[string]string) *entities.Category {
	description := record[account.DescriptionHeader]

	for _, category := range categories {
		for _, prefixRule := range category.PrefixRules {
			if strings.HasPrefix(description, prefixRule.Prefix) {
				return &category
			}
		}
	}

	return nil
}
