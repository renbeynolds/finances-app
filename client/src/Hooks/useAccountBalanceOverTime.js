import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { requestFetchAccountBalanceOverTimeData } from '../Redux/Charts/actions';

export const useAccountBalanceOverTime = (accountId) => {

    const dispatch = useDispatch();
    const [data, setData] = useState([]);
  
    useEffect(() => {
      const fetchData = async() => {
        const request = await dispatch(requestFetchAccountBalanceOverTimeData(accountId));
        setData(request.payload);
      };
      fetchData();
    }, [dispatch, accountId]);

    return data;

};