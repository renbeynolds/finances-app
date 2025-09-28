package validation_test

import (
	"testing"

	"github.com/renbeynolds/finances-app/modules/banking/dto"
	"github.com/renbeynolds/finances-app/modules/banking/validation"
	"github.com/stretchr/testify/assert"
)

func TestBankAccountValidation(t *testing.T) {
	bankAccountValidation := validation.NewBankAccountValidation()

	t.Run("successfully validates a valid CreateBankAccountRequest", func(t *testing.T) {
		req := dto.CreateBankAccountRequest{
			Name:              "Test Account",
			DateHeader:        "Date",
			DescriptionHeader: "Description",
			AmountExpression:  "Amount",
		}
		err := bankAccountValidation.ValidateCreateBankAccountRequest(req)
		assert.NoError(t, err)
	})

}
