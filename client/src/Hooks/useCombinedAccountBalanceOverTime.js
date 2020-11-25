import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { requestFetchCombinedAccountBalanceOverTimeData } from '../Redux/Charts/actions';

export const useCombinedAccountBalanceOverTime = (dateStrings, bucket) => {

    const dispatch = useDispatch();
    const [data, setData] = useState([]);
  
    useEffect(() => {
      const fetchData = async() => {
        const request = await dispatch(requestFetchCombinedAccountBalanceOverTimeData({ dateStrings, bucket }));
        setData(request.payload);
      };
      fetchData();
    }, [dispatch, dateStrings, bucket]);

    return data;

};