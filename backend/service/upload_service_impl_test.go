package service

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func Test_getTransactionAmount(t *testing.T) {

	var tests = []struct {
		record     map[string]string
		expression string
		expected   int64
	}{
		{
			map[string]string{"Credits(+)": "100.00", "Debits(-)": ""},
			`ParseMoney($env["Credits(+)"] == "" ? "0.0" : $env["Credits(+)"]) + -1 * ParseMoney($env["Debits(-)"] == "" ? "0.0" : $env["Debits(-)"])`,
			10000,
		},
		{
			map[string]string{"Credits(+)": "", "Debits(-)": "$100.00"},
			`ParseMoney($env["Credits(+)"] == "" ? "0.0" : $env["Credits(+)"]) + -1 * ParseMoney($env["Debits(-)"] == "" ? "0.0" : $env["Debits(-)"])`,
			-10000,
		},
		{
			map[string]string{"Amount": "$305.9", "Type": "Credit"},
			`Type == "Credit" ? ParseMoney(Amount) : -1 * ParseMoney(Amount)`,
			30590,
		},
		{
			map[string]string{"Amount": "$1,000.00", "Type": "Debit"},
			`Type == "Credit" ? ParseMoney(Amount) : -1 * ParseMoney(Amount)`,
			-100000,
		},
	}

	for _, test := range tests {
		amount, err := getTransactionAmount(test.expression, test.record)
		assert.NoError(t, err)
		assert.Equal(t, test.expected, amount)
	}
}
