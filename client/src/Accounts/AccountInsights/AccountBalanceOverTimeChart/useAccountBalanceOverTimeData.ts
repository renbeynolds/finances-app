import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { apiGet } from '../../../Utils';

export interface AccountsTotalDTO {
  date: string;
  total: string;
}

export const useAccountBalanceOverTimeData = (): AccountsTotalDTO[] => {
  const [data, setData] = React.useState<AccountsTotalDTO[]>([]);
  const { accountId: accountIdString } = useParams();
  const accountId = parseInt(accountIdString!);

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiGet<AccountsTotalDTO[]>(
        `/api/charts/account_balance?accountId=${accountId}`
      );
      setData(response);
    };
    fetchData();
  }, [setData, accountId]);

  return data;
};
