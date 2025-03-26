package service

import (
	"encoding/csv"
	"fmt"
	"strings"
	"time"

	"github.com/expr-lang/expr"
	"github.com/go-playground/validator/v10"
	"github.com/renbeynolds/finances-app/data/request"
	"github.com/renbeynolds/finances-app/data/response"
	"github.com/renbeynolds/finances-app/model"
	"github.com/renbeynolds/finances-app/repository"
	"github.com/renbeynolds/finances-app/util"
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
	csvData := util.ParseCSV(records)
	transactions := []model.Transaction{}

	for idx := len(csvData) - 1; idx >= 0; idx-- {
		record := csvData[idx]
		transaction := model.Transaction{
			Description: record[account.DescriptionHeader],
		}

		date, err := time.Parse(account.DateFormat, record[account.DateHeader])
		if err != nil {
			fmt.Println(err)
		}
		transaction.Date = date

		amount, err := getTransactionAmount(account.AmountExpression, record)
		if err != nil {
			// TODO
		}
		transaction.Amount = amount

		category := getTransactionCategory(categories, account, record)
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

func getTransactionAmount(amountExpression string, record map[string]string) (int64, error) {
	program, err := expr.Compile(amountExpression, expr.Env(record), expr.Function("ParseMoney", func(params ...any) (any, error) {
		return util.ParseMoney(params[0].(string))
	}, util.ParseMoney))
	if err != nil {
		return 0, err
	}

	output, err := expr.Run(program, record)
	if err != nil {
		return 0, err
	}

	amount64, ok := output.(int64)
	if ok {
		return amount64, nil
	}

	amount, ok := output.(int)
	if ok {
		return int64(amount), nil
	}

	return 0, fmt.Errorf("amount is not an integer")
}

func getTransactionCategory(categories []model.Category, account model.Account, record map[string]string) *model.Category {
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
