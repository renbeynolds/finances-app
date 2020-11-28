import moment from 'moment';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectEndDateFilter, selectStartDateFilter } from '../Redux/Filters/selectors';

export const useDateRange = (defaultRange, globalOverride = false) => {

    const [dates, setDates] = useState(defaultRange || [
        moment().subtract(1,'months').startOf('month'),
        moment().subtract(1,'months').endOf('month')
    ]);
    const [dateStrings, setDateStrings] = useState([dates[0].format('YYYY-MM-DD'), dates[1].format('YYYY-MM-DD')]);
    const [bucket, setBucket] = useState('month');

    const globalStartDate = useSelector(selectStartDateFilter);
    const globalEndDate = useSelector(selectEndDateFilter);
    
    useEffect(() => {
        if (globalOverride && globalStartDate && globalEndDate) {
            setDates([globalStartDate, globalEndDate]);
        }
    }, [globalStartDate, globalEndDate, globalOverride]);

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