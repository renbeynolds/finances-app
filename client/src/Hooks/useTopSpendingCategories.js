import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { requestFetchTopSpendingCategoriesData } from '../Redux/Charts/actions';

export const useTopSpendingCategories = (dateStrings) => {

    const dispatch = useDispatch();
    const [data, setData] = useState([]);
  
    useEffect(() => {
      const fetchData = async() => {
        const request = await dispatch(requestFetchTopSpendingCategoriesData(dateStrings));
        setData(request.payload);
      };
      fetchData();
    }, [dispatch, dateStrings]);

    return data;

};