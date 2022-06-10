import accounting from 'accounting';
import { Card, Typography } from 'antd';
import React from 'react';
import { useAverageExpenseData } from './useAverageExpenseData';

interface AverageExpenseIndicatorProps {
  onValueClick?: () => void;
}

const AverageExpenseIndicator = ({
  onValueClick,
}: AverageExpenseIndicatorProps): JSX.Element => {
  const data = useAverageExpenseData();

  return (
    <Card title='Average Expense (3 months)' bordered={false}>
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
          {accounting.formatMoney(data.avg)}
        </Typography.Title>
      </div>
    </Card>
  );
};

export default AverageExpenseIndicator;
