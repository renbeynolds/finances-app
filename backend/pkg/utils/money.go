package utils

import (
	"strconv"
	"strings"
)

func ParseMoney(s string) (int64, error) {
	// Clean string
	s = strings.ReplaceAll(s, "$", "")
	s = strings.ReplaceAll(s, ",", "")
	s = strings.TrimSpace(s)
	s = strings.ReplaceAll(s, " ", "")

	// Split into dollars and cents
	n := strings.SplitN(s, ".", 2)

	// If no decimal point, assume zero cents
	if len(n) == 1 {
		n = append(n, "00")
	}

	// If only 1 digit in cents, append a zero
	if len(n[1]) == 1 {
		n[1] = n[1] + "0"
	}

	// If more than 2 digits in cents, truncate to 2
	if len(n[1]) > 2 {
		n[1] = n[1][:2]
	}

	d, err := strconv.ParseInt(n[0], 10, 56)
	if err != nil {
		return 0, err
	}
	c, err := strconv.ParseUint(n[1], 10, 56)
	if err != nil {
		return 0, err
	}
	if d < 0 || n[0] == "-0" {
		c = -c
	}
	return d*100 + int64(c), nil
}
