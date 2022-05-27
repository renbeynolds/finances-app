import React, { useEffect } from 'react';
import { apiGet } from '../../../Utils';

export const useTagSpendingOverTimeData = (tagId: number) => {
  const [data, setData] = React.useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiGet<any>(
        `/api/charts/tag_spending_over_time?tagId=${tagId}`
      );
      setData(response);
    };
    fetchData();
  }, [setData, tagId]);

  return data;
};
