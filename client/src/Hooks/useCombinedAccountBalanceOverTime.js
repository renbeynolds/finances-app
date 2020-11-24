import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { requestFetchCombinedAccountBalanceOverTimeData } from '../Redux/Charts/actions';

export const useCombinedAccountBalanceOverTime = (accountId) => {

    const dispatch = useDispatch();
    const [data, setData] = useState([]);
  
    useEffect(() => {
      const fetchData = async() => {
        const request = await dispatch(requestFetchCombinedAccountBalanceOverTimeData());
        setData(request.payload);
      };
      fetchData();
    }, [dispatch, accountId]);

    return data;

};