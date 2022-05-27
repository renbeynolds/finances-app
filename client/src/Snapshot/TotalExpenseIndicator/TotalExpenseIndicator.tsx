import accounting from 'accounting';
import { Card, Typography } from 'antd';
import React from 'react';
import { useTotalExpenseData } from './useTotalExpenseData';

interface TotalExpenseIndicatorProps {
  onValueClick?: () => void;
}

const TotalExpenseIndicator = ({
  onValueClick,
}: TotalExpenseIndicatorProps): JSX.Element => {
  const data = useTotalExpenseData();

  return (
    <Card title='Expense' bordered={false}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Typography.Title
          type='danger'
          level={3}
          onClick={onValueClick}
          style={{ cursor: onValueClick ? 'pointer' : 'default' }}
        >
          {accounting.formatMoney(data.totalExpense)}
        </Typography.Title>
      </div>
    </Card>
  );
};

export default TotalExpenseIndicator;
