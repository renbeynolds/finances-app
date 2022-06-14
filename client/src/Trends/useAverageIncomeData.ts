import React, { useEffect } from 'react';
import { apiGet } from '../Utils';

export const useAverageIncomeData = () => {
  const [data, setData] = React.useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiGet<any>('/api/statistics/average_income');
      setData(response);
    };
    fetchData();
  }, [setData]);

  return data;
};
