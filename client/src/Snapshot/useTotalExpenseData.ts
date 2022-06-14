import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { endDateFilterAtom, startDateFilterAtom } from '../Filters/FilterState';
import { apiGet } from '../Utils';

export const useTotalExpenseData = () => {
  const startDateFilter = useRecoilValue(startDateFilterAtom);
  const endDateFilter = useRecoilValue(endDateFilterAtom);
  const [data, setData] = React.useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiGet<any>(
        `/api/statistics/total_expense?startDate=${startDateFilter}&endDate=${endDateFilter}`
      );
      setData(response);
    };
    fetchData();
  }, [setData, startDateFilter, endDateFilter]);

  return data;
};
