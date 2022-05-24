import React, { useEffect } from 'react';
import { apiGet } from '../../Utils';

interface IncomeVsExpenseDTO {
  month: string;
  Income: string;
  Expense: string;
  Total: string;
}

export const useIncomeVsExpenseData = (): IncomeVsExpenseDTO[] => {
  const [data, setData] = React.useState<IncomeVsExpenseDTO[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiGet<IncomeVsExpenseDTO[]>(
        '/api/charts/income_vs_expense'
      );
      setData(response);
    };
    fetchData();
  }, [setData]);

  return data;
};
