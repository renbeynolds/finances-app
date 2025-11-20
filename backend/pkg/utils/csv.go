package utils

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
