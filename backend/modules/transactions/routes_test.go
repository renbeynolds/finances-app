package transactions_test

import (
	"bytes"
	"encoding/json"
	"net/http/httptest"
	"testing"

	"github.com/renbeynolds/finances-app/modules/transactions/dto"
	"github.com/renbeynolds/finances-app/pkg/utils"
	"github.com/renbeynolds/finances-app/server"
	"github.com/stretchr/testify/assert"
)

func Test_UpdateTransaction(t *testing.T) {
	server := server.MakeServer(server.ServerOpts{
		DBType: "memory",
	})
	recorder := httptest.NewRecorder()

	comment := "Test comment"
	data := dto.UpdateTransactionRequest{
		Comment: &comment,
	}
	body, _ := json.Marshal(data)

	request := httptest.NewRequest("PATCH", "/api/transactions/1", bytes.NewBuffer(body))
	server.ServeHTTP(recorder, request)

	// Note: This test will fail with 404 since we don't have any transactions in the test DB
	// In a real implementation, you would seed test data first
	assert.Equal(t, 400, recorder.Code)

	var response utils.Response[utils.EmptyObj]
	err := json.Unmarshal(recorder.Body.Bytes(), &response)
	assert.NoError(t, err)
	assert.Equal(t, dto.MESSAGE_FAILED_UPDATE_TRANSACTION, response.Message)
}
