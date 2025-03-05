package money

import (
	"strconv"
	"strings"
)

func ParseMoney(money string) (int64, error) {
	money = strings.ReplaceAll(money, "$", "")
	money = strings.ReplaceAll(money, ",", "")
	money = strings.TrimSpace(money)
	money = strings.ReplaceAll(money, " ", "")
	value, err := strconv.ParseFloat(money, 64)
	if err != nil {
		return 0, err
	}
	return int64(value * 100), nil
}
