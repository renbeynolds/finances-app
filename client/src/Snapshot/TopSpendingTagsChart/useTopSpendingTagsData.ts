import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import {
  endDateFilterAtom,
  startDateFilterAtom,
} from '../../Filters/FilterState';
import { apiGet } from '../../Utils';
import { TopSpendingTagDTO } from './TopSpendingTagDTO';

export const useTopSpendingTagsData = () => {
  const [data, setData] = React.useState<TopSpendingTagDTO[]>([]);
  const startDate = useRecoilValue(startDateFilterAtom);
  const endDate = useRecoilValue(endDateFilterAtom);

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
