import React, { useEffect } from 'react';
import { apiGet } from '../../Utils';
import { TopSpendingTagDTO } from './TopSpendingTagDTO';

export const useTopSpendingTagsData = (startDate: string, endDate: string) => {
  const [data, setData] = React.useState<TopSpendingTagDTO[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiGet<any[]>(
        `/api/charts/top_spending_tags?startDate=${startDate}&endDate=${endDate}`
      );
      setData(response);
    };
    fetchData();
  }, [setData, startDate, endDate]);

  return data;
};
