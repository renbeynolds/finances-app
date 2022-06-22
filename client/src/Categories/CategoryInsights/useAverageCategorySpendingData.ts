import React, { useEffect } from 'react';
import { apiGet } from '../../Utils';

export const useAverageCategorySpendingData = (
  categoryId: number,
  monthsToAverage: number
) => {
  const [data, setData] = React.useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiGet<any>(
        `/api/statistics/average_category_spending?months=${monthsToAverage}&categoryId=${categoryId}`
      );
      setData(response);
    };
    fetchData();
  }, [setData, monthsToAverage, categoryId]);

  return data;
};
