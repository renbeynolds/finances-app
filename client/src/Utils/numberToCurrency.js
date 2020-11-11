export const numberToCurrency = (num) => {
    num = Number(num);
    if (num < 0) {
        num = num * -1
        return '-$' + Number(num).toFixed(2);
    } else {
        return '$' + Number(num).toFixed(2);
    }
};

export default numberToCurrency;