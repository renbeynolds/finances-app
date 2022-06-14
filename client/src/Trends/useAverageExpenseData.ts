import React, { useEffect } from 'react';
import { apiGet } from '../Utils';

export const useAverageExpenseData = () => {
  const [data, setData] = React.useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiGet<any>('/api/statistics/average_expense');
      setData(response);
    };
    fetchData();
  }, [setData]);

  return data;
};
