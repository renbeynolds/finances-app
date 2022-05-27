import accounting from 'accounting';
import { Card, Typography } from 'antd';
import React from 'react';
import { useTotalExpenseData } from './useTotalExpenseData';

const TotalExpenseIndicator = (): JSX.Element => {
  const data = useTotalExpenseData();

  return (
    <Card title='Expense' bordered={false}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Typography.Title type='danger' level={3}>
          {accounting.formatMoney(data.totalExpense)}
        </Typography.Title>
      </div>
    </Card>
  );
};

export default TotalExpenseIndicator;
