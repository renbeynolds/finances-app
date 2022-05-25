import moment from 'moment';
import React, { useEffect } from 'react';
import { apiGet } from '../../Utils';
import { TopSpendingTagDTO } from './TopSpendingTagDTO';

export const useTopSpendingTagsData = (
  startDate: moment.Moment,
  endDate: moment.Moment
) => {
  const [data, setData] = React.useState<TopSpendingTagDTO[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiGet<any[]>(
        `/api/charts/top_spending_tags?startDate=${startDate.format(
          'YYYY-MM-DD'
        )}&endDate=${endDate.format('YYYY-MM-DD')}`
      );
      setData(response);
    };
    fetchData();
  }, [setData, startDate, endDate]);

  return data;
};
