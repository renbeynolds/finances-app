package uploads_test

import (
	"bytes"
	"encoding/json"
	"net/http/httptest"
	"testing"

	"github.com/renbeynolds/finances-app/modules/uploads/dto"
	"github.com/renbeynolds/finances-app/pkg/utils"
	"github.com/renbeynolds/finances-app/server"
	"github.com/stretchr/testify/assert"
)

func Test_CreateUpload(t *testing.T) {
	server := server.MakeServer(server.ServerOpts{
		DBType: "memory",
	})
	recorder := httptest.NewRecorder()

	data := dto.CreateUploadRequest{
		BankAccountID: 1,
	}
	body, _ := json.Marshal(data)

	request := httptest.NewRequest("POST", "/api/uploads", bytes.NewBuffer(body))
	server.ServeHTTP(recorder, request)

	assert.Equal(t, 200, recorder.Code)

	var response utils.Response[dto.UploadResponse]
	err := json.Unmarshal(recorder.Body.Bytes(), &response)
	assert.NoError(t, err)
	assert.Equal(t, dto.MESSAGE_SUCCESS_CREATE_UPLOAD, response.Message)
}

func Test_GetAllUploads(t *testing.T) {
	server := server.MakeServer(server.ServerOpts{
		DBType: "memory",
	})
	recorder := httptest.NewRecorder()

	request := httptest.NewRequest("GET", "/api/uploads", nil)
	server.ServeHTTP(recorder, request)

	assert.Equal(t, 200, recorder.Code)

	var response utils.Response[[]dto.UploadResponse]
	err := json.Unmarshal(recorder.Body.Bytes(), &response)
	assert.NoError(t, err)
	assert.Equal(t, dto.MESSAGE_SUCCESS_LIST_UPLOADS, response.Message)
}
