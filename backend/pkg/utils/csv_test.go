package utils

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
