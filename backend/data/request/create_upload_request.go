package request

import "mime/multipart"

type CreateUploadRequest struct {
	AccountID uint                 `form:"accountId"`
	CSV       multipart.FileHeader `form:"csv"`
}
