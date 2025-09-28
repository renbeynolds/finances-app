package banking_test

import (
	"bytes"
	"encoding/json"
	"net/http/httptest"
	"testing"

	"github.com/renbeynolds/finances-app/modules/banking/dto"
	"github.com/renbeynolds/finances-app/pkg/utils"
	"github.com/renbeynolds/finances-app/server"
	"github.com/stretchr/testify/assert"
)

func Test_CreateBankAccount(t *testing.T) {
	server := server.MakeServer(server.ServerOpts{
		DBType: "memory",
	})
	recorder := httptest.NewRecorder()

	data := dto.CreateBankAccountRequest{
		Name:              "Foo Credit Union",
		DateHeader:        "Posted Date",
		DescriptionHeader: "Description",
		AmountExpression:  "ParseMoney(Amount)",
	}
	body, _ := json.Marshal(data)

	request := httptest.NewRequest("POST", "/api/bank_accounts", bytes.NewBuffer(body))
	server.ServeHTTP(recorder, request)
	assert.Equal(t, 200, recorder.Code)

	var resp utils.Response[dto.BankAccountResponse]
	json.Unmarshal(recorder.Body.Bytes(), &resp)

	assert.Equal(t, uint(1), resp.Data.ID)
	assert.Equal(t, "Foo Credit Union", resp.Data.Name)
	assert.Equal(t, "Posted Date", resp.Data.DateHeader)
	assert.Equal(t, "Description", resp.Data.DescriptionHeader)
	assert.Equal(t, "ParseMoney(Amount)", resp.Data.AmountExpression)
	assert.Equal(t, int64(0), resp.Data.StartingAmount)
	assert.Equal(t, int64(0), resp.Data.Balance)
	assert.Equal(t, "", resp.Data.Color)
	assert.Equal(t, "", resp.Data.LoginURL)
}
