package util

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func Test_ParseCSV(t *testing.T) {
	records := [][]string{
		{"Date", "Description", "Amount"},
		{"2021-01-01", "Test Description 1", "100.00"},
		{"2021-01-02", "Test Description 2", "-50.00"},
	}

	csvData := ParseCSV(records)
	assert.Equal(t, 2, len(csvData))
	assert.Equal(t, "2021-01-01", csvData[0]["Date"])
	assert.Equal(t, "Test Description 1", csvData[0]["Description"])
	assert.Equal(t, "100.00", csvData[0]["Amount"])
}

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
	}

	for _, test := range tests {
		amount, err := ParseMoney(test.input)
		assert.NoError(t, err)
		assert.Equal(t, test.expected, amount)
	}
}
