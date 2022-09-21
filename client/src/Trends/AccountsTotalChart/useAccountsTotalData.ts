import React, { useEffect } from 'react';
import { apiGet } from '../../Utils';

export interface AccountsTotalDTO {
  date: string;
  total: string;
}

export const useAccountsTotalData = (): AccountsTotalDTO[] => {
  const [data, setData] = React.useState<AccountsTotalDTO[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiGet<AccountsTotalDTO[]>(
        '/api/charts/accounts_total'
      );
      setData(response);
    };
    fetchData();
  }, [setData]);

  return data;
};
