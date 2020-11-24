import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { requestFetchAccountOptions } from '../Redux/Accounts/actions';

export const useAccountOptions = () => {

    const dispatch = useDispatch();
    const [data, setData] = useState([]);
  
    useEffect(() => {
      const fetchData = async() => {
        const request = await dispatch(requestFetchAccountOptions());
        setData(request.payload);
      };
      fetchData();
    }, [dispatch]);

    return data;

};