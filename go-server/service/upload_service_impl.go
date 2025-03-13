package service

import (
	"encoding/csv"
	"fmt"
	"slices"
	"strings"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/renbeynolds/finances-app/data/request"
	"github.com/renbeynolds/finances-app/data/response"
	"github.com/renbeynolds/finances-app/model"
	"github.com/renbeynolds/finances-app/repository"
	"github.com/renbeynolds/finances-app/util/money"
)

type UploadServiceImpl struct {
	UploadRepository   repository.UploadRepository
	AccountRepository  repository.AccountRepository
	CategoryRepository repository.CategoryRepository
	Validate           *validator.Validate
}

func NewUploadServiceImpl(uploadRepository repository.UploadRepository, accountRepository repository.AccountRepository, categoryRepository repository.CategoryRepository) UploadService {
	return &UploadServiceImpl{
		UploadRepository:   uploadRepository,
		AccountRepository:  accountRepository,
		CategoryRepository: categoryRepository,
	}
}

func (t *UploadServiceImpl) FindAll() []response.UploadResponse {
	result := t.UploadRepository.FindAll()

	uploads := []response.UploadResponse{}
	for _, value := range result {
		upload := response.UploadResponse{
			Id: int(value.ID),
		}
		uploads = append(uploads, upload)
	}

	return uploads
}

func (t *UploadServiceImpl) Create(upload request.CreateUploadRequest) response.UploadResponse {
	account, err := t.AccountRepository.FindByID(upload.AccountID)
	if err != nil {
		// TODO
	}

	categories := t.CategoryRepository.FindAll()

	multipartFileContent, err := upload.CSV.Open()
	if err != nil {
		// TODO
	}

	csvReader := csv.NewReader(multipartFileContent)
	records, err := csvReader.ReadAll()
	if err != nil {
		// TODO
	}

	header, err := getCSVHeader(account, records[0])
	if err != nil {
		fmt.Errorf("error getting csv header: %v", err)
	}

	transactions := []model.Transaction{}

	for idx, record := range records {
		if idx == 0 {
			continue
		}
		transaction := model.Transaction{
			Description: record[header.DescriptionIndex],
		}

		date, err := time.Parse("2006/01/02", record[header.DateIndex]) // TODO: date format
		if err != nil {
			// TODO
		}
		transaction.Date = date

		amount, err := getTransactionAmount(account, header, record)
		if err != nil {
			// TODO
		}
		transaction.Amount = amount

		category := getTransactionCategory(categories, header, record)
		if category != nil {
			transaction.CategoryID = &category.ID
		}

		transaction.Balance = account.Balance + transaction.Amount
		account.Balance = transaction.Balance

		transactions = append(transactions, transaction)
	}

	// TODO: Do this inside a transaction

	uploadModel := t.UploadRepository.Insert(model.Upload{
		AccountID:    account.ID,
		Transactions: transactions,
	})

	t.AccountRepository.Update(account)

	return response.UploadResponse{
		Id: int(uploadModel.ID),
	}
}

type CSVHeader struct {
	DateIndex        int
	DescriptionIndex int
	AmountIndex      *int
	IncomeIndex      *int
	ExpenseIndex     *int
	TypeIndex        *int
}

func getCSVHeader(account model.Account, header []string) (CSVHeader, error) {
	csvHeader := CSVHeader{}
	dateIndex := slices.Index(header, account.DateHeader)
	if dateIndex == -1 {
		return csvHeader, fmt.Errorf("date column not found")
	}
	csvHeader.DateIndex = dateIndex

	descriptionIndex := slices.Index(header, account.DescriptionHeader)
	if descriptionIndex == -1 {
		return csvHeader, fmt.Errorf("description column not found")
	}
	csvHeader.DescriptionIndex = descriptionIndex

	if account.AmountHeader != nil {
		amountIndex := slices.Index(header, *account.AmountHeader)
		if amountIndex == -1 {
			return csvHeader, fmt.Errorf("amount column not found")
		}
		csvHeader.AmountIndex = &amountIndex
	}

	if account.IncomeHeader != nil {
		incomeIndex := slices.Index(header, *account.IncomeHeader)
		if incomeIndex == -1 {
			return csvHeader, fmt.Errorf("income column not found")
		}
		csvHeader.IncomeIndex = &incomeIndex
	}

	if account.ExpenseHeader != nil {
		expenseIndex := slices.Index(header, *account.ExpenseHeader)
		if expenseIndex == -1 {
			return csvHeader, fmt.Errorf("income column not found")
		}
		csvHeader.ExpenseIndex = &expenseIndex
	}

	if account.TypeHeader != nil {
		typeIndex := slices.Index(header, *account.TypeHeader)
		if typeIndex == -1 {
			return csvHeader, fmt.Errorf("income column not found")
		}
		csvHeader.TypeIndex = &typeIndex
	}

	return csvHeader, nil
}

func getTransactionAmount(account model.Account, header CSVHeader, record []string) (int64, error) {
	var value int64
	var err error

	switch account.AmountsType {
	case model.SeparateIncomeExpenseColumns:
		income := record[*header.IncomeIndex]
		expense := record[*header.ExpenseIndex]
		if strings.TrimSpace(income) != "" {
			value, err = money.ParseMoney(income)
			if err != nil {
				return 0, err
			}
		} else if strings.TrimSpace(expense) != "" {
			value, err = money.ParseMoney(expense)
			if err != nil {
				return 0, err
			}
		}

	case model.PositiveAmountExpense:
		value, err = money.ParseMoney(record[*header.AmountIndex])
		if err != nil {
			return 0, err
		}
		value = value * -1

	case model.NegativeAmountExpense:
		value, err = money.ParseMoney(record[*header.AmountIndex])
		if err != nil {
			return 0, err
		}

	case model.SeparateTypeColumn:
		value, err = money.ParseMoney(record[*header.AmountIndex])
		if err != nil {
			return 0, err
		}
		if record[*header.TypeIndex] == "Debit" {
			value = value * -1
		}

	default:
		return 0, fmt.Errorf("invalid amounts type")

	}

	return value, nil
}

func getTransactionCategory(categories []model.Category, header CSVHeader, record []string) *model.Category {
	description := record[header.DescriptionIndex]
	for _, category := range categories {
		for _, prefixRule := range category.PrefixRules {
			if strings.HasPrefix(description, prefixRule.Prefix) {
				return &category
			}
		}
	}
	return nil
}
