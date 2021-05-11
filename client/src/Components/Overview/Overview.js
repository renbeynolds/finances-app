import { Space } from 'antd';
import React from 'react';
import { CombinedAccountBalanceOverTime } from '../Charts/CombinedAccountBalanceOverTime';
import { IncomeVsExpense } from '../Charts/IncomeVsExpense';
import { TagTotalOverTime } from '../Charts/TagTotalOverTime';
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
        <TagTotalOverTime/>
      </Space>
    </Space>
  );
}

export default Overview;