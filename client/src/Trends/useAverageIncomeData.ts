import React, { useEffect } from 'react';
import { apiGet } from '../Utils';

export const useAverageIncomeData = (monthsToAverage: number) => {
  const [data, setData] = React.useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiGet<any>(
        `/api/statistics/average_income?months=${monthsToAverage}`
      );
      setData(response);
    };
    fetchData();
  }, [setData, monthsToAverage]);

  return data;
};
