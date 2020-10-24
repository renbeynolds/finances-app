import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { requestFetchSpendingOverTimeData } from '../../Redux/Charts/actions';
import { selectTransactionSearch } from '../../Redux/Filters/selectors';

function SpendingOverTimeChart() {

  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const search = useSelector(selectTransactionSearch);

  useEffect(() => {
    const fetchData = async() => {
      const request = await dispatch(requestFetchSpendingOverTimeData({
        search: search
      }));
      setData(request.payload);
    };
    fetchData();
  }, [dispatch]);

  return (
    <LineChart
      width={600}
      height={300}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <XAxis dataKey='month'/>
      <YAxis tickFormatter={(value) => ('$' + value.toFixed(0))}/>
      <CartesianGrid strokeDasharray='3 3'/>
      <Tooltip formatter={(value) => ('$' + value.toFixed(2))}/>
      <Line type='monotone' dataKey='total' stroke='#8884d8' activeDot={{ r: 8 }}/>
    </LineChart>
  );
}

export default SpendingOverTimeChart;