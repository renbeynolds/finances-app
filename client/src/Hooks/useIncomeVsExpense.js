import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { requestFetchIncomeVsExpenseData } from '../Redux/Charts/actions';

export const useIncomeVsExpense = (dateStrings) => {

    const dispatch = useDispatch();
    const [data, setData] = useState([]);
  
    useEffect(() => {
      const fetchData = async() => {
        const request = await dispatch(requestFetchIncomeVsExpenseData(dateStrings));
        setData(request.payload);
      };
      fetchData();
    }, [dispatch, dateStrings]);

    return data;

};