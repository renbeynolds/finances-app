import moment from 'moment';
import { useEffect, useState } from 'react';

export const useDateRange = (defaultRange) => {

    const [dates, setDates] = useState(defaultRange || [
        moment().subtract(1,'months').startOf('month'),
        moment().subtract(1,'months').endOf('month')
    ]);

    const [dateStrings, setDateStrings] = useState([dates[0].format('YYYY-MM-DD'), dates[1].format('YYYY-MM-DD')]);

    useEffect(() => {
        setDateStrings([dates[0].format('YYYY-MM-DD'), dates[1].format('YYYY-MM-DD')]);
    }, [dates]);

    const setStartDate = (startDate) => {
        setDates((r) => [startDate, r[1]]);
    };

    const setEndDate = (endDate) => {
        setDates((r) => [r[0], endDate]);
    };

    return {
        dates: [dates],
        dateStrings: dateStrings,
        setDates: setDates,
        setStartDate: setStartDate,
        setEndDate: setEndDate
    };

};