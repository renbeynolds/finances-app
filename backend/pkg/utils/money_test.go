package utils

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func Test_ParseMoney(t *testing.T) {
	tests := []struct {
		input    string
		expected int64
	}{
		{"$100.00", 10000},
		{"$-1,000.00", -100000},
		{"305.9", 30590},
		{"200", 20000},
		{"0.08000", 8},
		{"-11.57000", -1157},
		{"-0.99", -99},
	}

	for _, test := range tests {
		amount, err := ParseMoney(test.input)
		assert.NoError(t, err)
		assert.Equal(t, test.expected, amount)
	}
}
