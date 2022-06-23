import React, { useEffect } from 'react';
import { apiGet } from '../Utils';

export const useTotalIncomeData = (startDate: string, endDate: string) => {
  const [data, setData] = React.useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiGet<any>(
        `/api/statistics/total_income?startDate=${startDate}&endDate=${endDate}`
      );
      setData(response);
    };
    fetchData();
  }, [setData, startDate, endDate]);

  return data;
};
