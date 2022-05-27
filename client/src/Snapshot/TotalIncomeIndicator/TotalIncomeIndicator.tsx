import accounting from 'accounting';
import { Card, Typography } from 'antd';
import React from 'react';
import { useTotalIncomeData } from './useTotalIncomeData';

const TotalIncomeIndicator = (): JSX.Element => {
  const data = useTotalIncomeData();

  return (
    <Card title='Income' bordered={false}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Typography.Title type='success' level={3}>
          {accounting.formatMoney(data.totalIncome)}
        </Typography.Title>
      </div>
    </Card>
  );
};

export default TotalIncomeIndicator;
