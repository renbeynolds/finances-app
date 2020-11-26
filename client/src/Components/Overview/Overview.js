import { Space } from 'antd';
import React from 'react';
import { CombinedAccountBalanceOverTime } from '../Charts/CombinedAccountBalanceOverTime';
import { IncomeVsExpense } from '../Charts/IncomeVsExpense';
import { TopSpendingCategories } from '../Charts/TopSpendingCategories';

function Overview() {
  return (
    <Space direction='vertical' size={50}>
      <Space direction='horizontal'>
        <CombinedAccountBalanceOverTime/>
        <TopSpendingCategories/>
      </Space>
      <Space direction='horizontal'>
        <IncomeVsExpense/>
      </Space>
    </Space>
  );
}

export default Overview;