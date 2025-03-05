package money

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func Test_ParseMoney(t *testing.T) {
	var tests = []struct {
		input    string
		expected int64
	}{
		{"1.00", 100},
		{"$1.00", 100},
		{"$1,000.00", 100000},
		{"-1.23", -123},
		{"-$1.23", -123},
		{"$-1.23", -123},
		{"$-1,000.23", -100023},
		{"$ 1,000.23", 100023},
		{"-$ 1,000.23", -100023},
		{"$ 1.00      ", 100},
	}

	for _, test := range tests {
		val, err := ParseMoney(test.input)
		assert.Equal(t, test.expected, val)
		assert.NoError(t, err)
	}
}
