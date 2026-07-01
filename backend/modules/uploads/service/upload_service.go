package service

import (
	"context"
	"encoding/csv"
	"encoding/json"
	"fmt"
	"strings"
	"time"

	"github.com/araddon/dateparse"
	"github.com/expr-lang/expr"
	"github.com/renbeynolds/finances-app/database/entities"
	bankingRepository "github.com/renbeynolds/finances-app/modules/banking/repository"
	categoryRepository "github.com/renbeynolds/finances-app/modules/categories/repository"
	queryPkg "github.com/renbeynolds/finances-app/modules/transactions/query"
	transactionRepository "github.com/renbeynolds/finances-app/modules/transactions/repository"
	"github.com/renbeynolds/finances-app/modules/uploads/dto"
	"github.com/renbeynolds/finances-app/modules/uploads/repository"
	"github.com/renbeynolds/finances-app/pkg/utils"
	"gorm.io/gorm"
)

type UploadService interface {
	CreateUpload(ctx context.Context, req dto.CreateUploadRequest) (dto.UploadResponse, error)
	PreviewUpload(ctx context.Context, req dto.CreateUploadRequest) (dto.PreviewUploadResponse, error)
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

type parsedRow struct {
	Index       int
	Date        time.Time
	Description string
	Amount      int64
	CategoryID  *uint
}

func (s *uploadService) parseCSVRecords(account entities.BankAccount, categories []entities.Category, records [][]string) ([]parsedRow, error) {
	csvData := utils.ParseCSV(records)
	if len(csvData) == 0 {
		return nil, fmt.Errorf("no data found in CSV file")
	}

	var parsed []parsedRow
	for idx := len(csvData) - 1; idx >= 0; idx-- {
		record := csvData[idx]

		date, err := dateparse.ParseLocal(record[account.DateHeader])
		if err != nil {
			return nil, fmt.Errorf("error parsing date %s: %v", record[account.DateHeader], err)
		}

		amount, err := s.getTransactionAmount(account.AmountExpression, record)
		if err != nil {
			return nil, fmt.Errorf("error parsing amount: %v", err)
		}

		category := s.getTransactionCategory(categories, account, record)
		var catID *uint
		if category != nil {
			catID = &category.ID
		}

		parsed = append(parsed, parsedRow{
			Index:       idx,
			Date:        date,
			Description: record[account.DescriptionHeader],
			Amount:      amount,
			CategoryID:  catID,
		})
	}
	return parsed, nil
}

func (s *uploadService) PreviewUpload(ctx context.Context, req dto.CreateUploadRequest) (dto.PreviewUploadResponse, error) {
	tx := s.db.Begin()
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		} else {
			tx.Commit()
		}
	}()

	account, err := s.bankAccountRepository.GetBankAccountByID(ctx, tx, req.BankAccountID)
	if err != nil {
		return dto.PreviewUploadResponse{}, fmt.Errorf("error finding bank account: %v", err)
	}

	categories, err := s.categoryRepository.GetAllCategories(ctx, tx)
	if err != nil {
		return dto.PreviewUploadResponse{}, fmt.Errorf("error fetching categories: %v", err)
	}

	fileContent, err := req.CSV.Open()
	if err != nil {
		return dto.PreviewUploadResponse{}, fmt.Errorf("error opening file: %v", err)
	}
	defer fileContent.Close()

	csvReader := csv.NewReader(fileContent)
	csvReader.FieldsPerRecord = -1
	records, err := csvReader.ReadAll()
	if err != nil {
		return dto.PreviewUploadResponse{}, fmt.Errorf("error reading CSV file: %v", err)
	}

	parsedRows, err := s.parseCSVRecords(account, categories, records)
	if err != nil {
		return dto.PreviewUploadResponse{}, err
	}

	// Fetch recent transactions for duplication check
	accountIDStr := fmt.Sprintf("%d", req.BankAccountID)
	query := &queryPkg.TransactionQuery{
		AccountID: &accountIDStr,
	}
	pag := &utils.Pagination{Page: 1, Limit: 100}
	recentTx, err := s.transactionRepository.GetAllTransactions(ctx, tx, pag, query)
	if err != nil {
		return dto.PreviewUploadResponse{}, fmt.Errorf("error fetching recent transactions: %v", err)
	}

	var previewResponse dto.PreviewUploadResponse
	for _, row := range parsedRows {
		isDup := false
		for _, rtx := range recentTx {
			if rtx.Amount == row.Amount && rtx.Description == row.Description && rtx.Date.Format("2006-01-02") == row.Date.Format("2006-01-02") {
				isDup = true
				break
			}
		}
		previewResponse.ParsedTransactions = append(previewResponse.ParsedTransactions, dto.ParsedTransaction{
			Index:       row.Index,
			Date:        row.Date.Format(time.RFC3339),
			Description: row.Description,
			Amount:      row.Amount,
			IsDuplicate: isDup,
			CategoryID:  row.CategoryID,
		})
	}

	return previewResponse, nil
}

func (s *uploadService) CreateUpload(ctx context.Context, req dto.CreateUploadRequest) (dto.UploadResponse, error) {
	tx := s.db.Begin()
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()

	account, err := s.bankAccountRepository.GetBankAccountByID(ctx, tx, req.BankAccountID)
	if err != nil {
		tx.Rollback()
		return dto.UploadResponse{}, fmt.Errorf("error finding bank account: %v", err)
	}

	categories, err := s.categoryRepository.GetAllCategories(ctx, tx)
	if err != nil {
		tx.Rollback()
		return dto.UploadResponse{}, fmt.Errorf("error fetching categories: %v", err)
	}

	fileContent, err := req.CSV.Open()
	if err != nil {
		tx.Rollback()
		return dto.UploadResponse{}, fmt.Errorf("error opening file: %v", err)
	}
	defer fileContent.Close()

	csvReader := csv.NewReader(fileContent)
	csvReader.FieldsPerRecord = -1
	records, err := csvReader.ReadAll()
	if err != nil {
		tx.Rollback()
		return dto.UploadResponse{}, fmt.Errorf("error reading CSV file: %v", err)
	}

	parsedRows, err := s.parseCSVRecords(account, categories, records)
	if err != nil {
		tx.Rollback()
		return dto.UploadResponse{}, err
	}

	excludedMap := make(map[int]bool)
	if req.ExcludedIndices != "" {
		var excluded []int
		if err := json.Unmarshal([]byte(req.ExcludedIndices), &excluded); err != nil {
			tx.Rollback()
			return dto.UploadResponse{}, fmt.Errorf("error parsing excluded indices: %v", err)
		}
		for _, i := range excluded {
			excludedMap[i] = true
		}
	}

	upload := entities.Upload{
		BankAccountID: req.BankAccountID,
	}

	createdUpload, err := s.uploadRepository.CreateUpload(ctx, tx, upload)
	if err != nil {
		tx.Rollback()
		return dto.UploadResponse{}, fmt.Errorf("error creating upload: %v", err)
	}

	var transactions []entities.Transaction
	currentBalance := account.Balance

	for _, row := range parsedRows {
		if excludedMap[row.Index] {
			continue
		}

		currentBalance += row.Amount

		transactions = append(transactions, entities.Transaction{
			UploadID:    createdUpload.ID,
			Description: row.Description,
			Date:        row.Date,
			Amount:      row.Amount,
			CategoryID:  row.CategoryID,
			Balance:     currentBalance,
		})
	}

	if len(transactions) > 0 {
		if err := s.transactionRepository.BulkCreateTransactions(ctx, tx, transactions); err != nil {
			tx.Rollback()
			return dto.UploadResponse{}, fmt.Errorf("error creating transactions: %v", err)
		}
	}

	account.Balance = currentBalance
	if _, err := s.bankAccountRepository.UpdateBankAccount(ctx, tx, account); err != nil {
		tx.Rollback()
		return dto.UploadResponse{}, fmt.Errorf("error updating bank account balance: %v", err)
	}

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
