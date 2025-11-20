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
		BankAccountID uint                  `form:"bankAccountId" validate:"required"`
		CSV           *multipart.FileHeader `form:"csv" validate:"required"`
	}

	UploadResponse struct {
		ID        uint   `json:"id"`
		CreatedAt string `json:"createdAt"`
	}
)
