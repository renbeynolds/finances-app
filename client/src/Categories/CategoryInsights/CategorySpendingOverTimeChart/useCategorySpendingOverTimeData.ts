import React, { useEffect } from 'react';
import { apiGet } from '../../../Utils';

export const useCategorySpendingOverTimeData = (categoryId: number) => {
  const [data, setData] = React.useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiGet<any>(
        `/api/charts/category_spending_over_time?categoryId=${categoryId}`
      );
      setData(response);
    };
    fetchData();
  }, [setData, categoryId]);

  return data;
};
