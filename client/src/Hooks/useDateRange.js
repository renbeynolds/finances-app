import moment from 'moment';
import { useEffect, useState } from 'react';

export const useDateRange = (defaultRange) => {

    const [dates, setDates] = useState(defaultRange || [
        moment().subtract(1,'months').startOf('month'),
        moment().subtract(1,'months').endOf('month')
    ]);

    const [dateStrings, setDateStrings] = useState([dates[0].format('YYYY-MM-DD'), dates[1].format('YYYY-MM-DD')]);

    const [bucket, setBucket] = useState('month');

    useEffect(() => {
        setDateStrings([dates[0].format('YYYY-MM-DD'), dates[1].format('YYYY-MM-DD')]);
        const days = Math.floor(moment.duration(dates[1].diff(dates[0])).asDays());
        if (days <= 31) {            // less than 1 month
            setBucket('day');
        } else if (days <= 365) {    // less than 1 year
            setBucket('week');
        } else {
            setBucket('month'); // over 1 year
        }
    }, [dates]);

    const setStartDate = (startDate) => {
        setDates((r) => [startDate, r[1]]);
    };

    const setEndDate = (endDate) => {
        setDates((r) => [r[0], endDate]);
    };

    return {
        dates,
        dateStrings,
        bucket,
        setDates,
        setStartDate,
        setEndDate
    };

};