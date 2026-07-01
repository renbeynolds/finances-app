package dto

import "mime/multipart"

const (
	MESSAGE_FAILED_CREATE_UPLOAD  = "failed create upload"
	MESSAGE_SUCCESS_CREATE_UPLOAD = "success create upload"

	MESSAGE_FAILED_LIST_UPLOADS  = "failed list uploads"
	MESSAGE_SUCCESS_LIST_UPLOADS = "success list uploads"
)

type (
	CreateUploadRequest struct {
		BankAccountID   uint                  `form:"bankAccountId" validate:"required"`
		CSV             *multipart.FileHeader `form:"csv" validate:"required"`
		ExcludedIndices string                `form:"excludedIndices"`
	}

	UploadResponse struct {
		ID        uint   `json:"id"`
		CreatedAt string `json:"createdAt"`
	}

	ParsedTransaction struct {
		Index       int    `json:"index"`
		Date        string `json:"date"`
		Description string `json:"description"`
		Amount      int64  `json:"amount"`
		IsDuplicate bool   `json:"isDuplicate"`
		CategoryID  *uint  `json:"categoryId"`
	}

	PreviewUploadResponse struct {
		ParsedTransactions []ParsedTransaction `json:"parsedTransactions"`
	}
)
