import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { requestFetchTopSpendingCategoriesData } from '../Redux/Charts/actions';

export const useTopSpendingCategories = (dateStrings, numCategories) => {

    const dispatch = useDispatch();
    const [data, setData] = useState([]);
  
    useEffect(() => {
      const fetchData = async() => {
        const request = await dispatch(requestFetchTopSpendingCategoriesData({ dateStrings, numCategories }));
        setData(request.payload);
      };
      fetchData();
    }, [dispatch, dateStrings, numCategories]);

    return data;

};