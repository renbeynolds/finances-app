package investments_test

import (
	"bytes"
	"encoding/json"
	"net/http/httptest"
	"testing"

	"github.com/renbeynolds/finances-app/modules/investments/dto"
	"github.com/renbeynolds/finances-app/pkg/utils"
	"github.com/renbeynolds/finances-app/server"
	"github.com/stretchr/testify/assert"
)

func Test_CreateInvestmentAccount(t *testing.T) {
	server := server.MakeServer(server.ServerOpts{
		DBType: "memory",
	})
	recorder := httptest.NewRecorder()

	data := dto.CreateInvestmentAccountRequest{
		Name: "Foo Investment Account",
	}
	body, _ := json.Marshal(data)

	request := httptest.NewRequest("POST", "/api/investment_accounts", bytes.NewBuffer(body))
	server.ServeHTTP(recorder, request)
	assert.Equal(t, 200, recorder.Code)

	var resp utils.Response[dto.InvestmentAccountResponse]
	json.Unmarshal(recorder.Body.Bytes(), &resp)

	assert.Equal(t, uint(1), resp.Data.ID)
	assert.Equal(t, "Foo Investment Account", resp.Data.Name)
	assert.Equal(t, int64(0), resp.Data.Balance)
	assert.NotEmpty(t, resp.Data.UpdatedAt)
}
