import accounting from 'accounting';
import { Card, Typography } from 'antd';
import React from 'react';
import { useAverageIncomeData } from './useAverageIncomeData';

interface AverageIncomeIndicatorProps {
  onValueClick?: () => void;
}

const AverageIncomeIndicator = ({
  onValueClick,
}: AverageIncomeIndicatorProps): JSX.Element => {
  const data = useAverageIncomeData();

  return (
    <Card title='Average Income (3 months)' bordered={false}>
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
          {accounting.formatMoney(data.avg)}
        </Typography.Title>
      </div>
    </Card>
  );
};

export default AverageIncomeIndicator;
