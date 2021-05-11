import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestFetchTagTotalOverTimeData } from '../Redux/Charts/actions';
import { selectTagIdsFilter } from '../Redux/Filters/selectors';

export const useTagTotalOverTime = (dateStrings) => {

    const dispatch = useDispatch();
    const tagIds = useSelector(selectTagIdsFilter);
    const [data, setData] = useState([]);
  
    useEffect(() => {
      const fetchData = async() => {
        const request = await dispatch(requestFetchTagTotalOverTimeData({
          dateStrings: dateStrings,
          tagId: tagIds.length > 0 ? tagIds[0] : undefined
        }));
        setData(request.payload);
      };
      fetchData();
    }, [dispatch, dateStrings, tagIds]);

    return data;

};