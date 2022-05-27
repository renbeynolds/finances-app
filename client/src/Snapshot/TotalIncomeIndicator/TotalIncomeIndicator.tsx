import accounting from 'accounting';
import { Card, Typography } from 'antd';
import React from 'react';
import { useTotalIncomeData } from './useTotalIncomeData';

interface TotalIncomeIndicatorProps {
  onValueClick?: () => void;
}

const TotalIncomeIndicator = ({
  onValueClick,
}: TotalIncomeIndicatorProps): JSX.Element => {
  const data = useTotalIncomeData();

  return (
    <Card title='Income' bordered={false}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Typography.Title
          type='success'
          level={3}
          onClick={onValueClick}
          style={{ cursor: onValueClick ? 'pointer' : 'default' }}
        >
          {accounting.formatMoney(data.totalIncome)}
        </Typography.Title>
      </div>
    </Card>
  );
};

export default TotalIncomeIndicator;
