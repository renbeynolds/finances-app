package util

import (
	"strconv"
	"strings"
)

func ErrorPanic(err error) {
	if err != nil {
		panic(err)
	}
}

func ParseCSV(rows [][]string) []map[string]string {
	headers := rows[0]
	parsedRows := []map[string]string{}
	for _, row := range rows[1:] {
		parsedRow := map[string]string{}
		for i, header := range headers {
			parsedRow[header] = row[i]
		}
		parsedRows = append(parsedRows, parsedRow)
	}
	return parsedRows
}

func ParseMoney(s string) (int64, error) {
	s = strings.ReplaceAll(s, "$", "")
	s = strings.ReplaceAll(s, ",", "")
	s = strings.TrimSpace(s)
	s = strings.ReplaceAll(s, " ", "")
	n := strings.SplitN(s, ".", 3)
	if len(n) == 1 {
		n = append(n, "00")
	}
	if len(n[1]) == 1 {
		n[1] = n[1] + "0"
	}
	d, err := strconv.ParseInt(n[0], 10, 56)
	if err != nil {
		return 0, err
	}
	c, err := strconv.ParseUint(n[1], 10, 8)
	if err != nil {
		return 0, err
	}
	if d < 0 {
		c = -c
	}
	return d*100 + int64(c), nil
}
