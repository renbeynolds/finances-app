package categories_test

import (
	"bytes"
	"encoding/json"
	"net/http/httptest"
	"testing"

	"github.com/renbeynolds/finances-app/modules/categories/dto"
	"github.com/renbeynolds/finances-app/pkg/utils"
	"github.com/renbeynolds/finances-app/server"
	"github.com/stretchr/testify/assert"
)

func Test_CreateCategory(t *testing.T) {
	server := server.MakeServer(server.ServerOpts{
		DBType: "memory",
	})
	recorder := httptest.NewRecorder()

	data := dto.CreateCategoryRequest{
		Name: "Groceries",
		Type: "expense",
	}
	body, _ := json.Marshal(data)

	request := httptest.NewRequest("POST", "/api/categories", bytes.NewBuffer(body))
	server.ServeHTTP(recorder, request)

	assert.Equal(t, 200, recorder.Code)

	var response utils.Response[dto.CategoryResponse]
	err := json.Unmarshal(recorder.Body.Bytes(), &response)
	assert.NoError(t, err)
	assert.Equal(t, dto.MESSAGE_SUCCESS_CREATE_CATEGORY, response.Message)
}

func Test_GetAllCategories(t *testing.T) {
	server := server.MakeServer(server.ServerOpts{
		DBType: "memory",
	})
	recorder := httptest.NewRecorder()

	request := httptest.NewRequest("GET", "/api/categories", nil)
	server.ServeHTTP(recorder, request)

	assert.Equal(t, 200, recorder.Code)

	var response utils.Response[[]dto.CategoryResponse]
	err := json.Unmarshal(recorder.Body.Bytes(), &response)
	assert.NoError(t, err)
	assert.Equal(t, dto.MESSAGE_SUCCESS_LIST_CATEGORIES, response.Message)
}
