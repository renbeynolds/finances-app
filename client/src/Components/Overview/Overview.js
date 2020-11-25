import { Space } from 'antd';
import React from 'react';
import { CombinedAccountBalanceOverTime } from '../Charts/CombinedAccountBalanceOverTime';
import TopSpendingCategories from '../Charts/TopSpendingCategories/TopSpendingCategories';

function Overview() {
  return (
    <Space direction='horizontal'>
      <CombinedAccountBalanceOverTime/>
      <TopSpendingCategories/>
    </Space>
  );
}

export default Overview;