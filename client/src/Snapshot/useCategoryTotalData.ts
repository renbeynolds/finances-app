import React, { useEffect } from 'react';
import { apiGet } from '../Utils';

export const useCategoryTotalData = (
  categoryId: number | undefined,
  startDate: string,
  endDate: string
) => {
  const [data, setData] = React.useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiGet<any>(
        `/api/statistics/category_total?startDate=${startDate}&endDate=${endDate}&categoryId=${categoryId}`
      );
      setData(response);
    };
    if (categoryId) {
      fetchData();
    }
  }, [setData, categoryId, startDate, endDate]);

  return data;
};
