import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import React from 'react';

interface PercentChangeIndicatorProps {
  currentValue: number;
  previousValue: number;
  desiredChange: 'increase' | 'decrease';
}

const PercentChangeIndicator = ({
  currentValue,
  previousValue,
  desiredChange,
}: PercentChangeIndicatorProps): JSX.Element => {
  const changeAmount = currentValue - previousValue;
  const percentChange = (
    (Math.abs(changeAmount) / previousValue) *
    100
  ).toFixed(1);

  const color =
    desiredChange === 'increase' && changeAmount > 0 ? 'green' : 'red';

  return (
    <div>
      {changeAmount > 0 ? (
        <CaretUpOutlined style={{ color: color, marginRight: '8px' }} />
      ) : (
        <CaretDownOutlined style={{ color: color, marginRight: '8px' }} />
      )}
      <Typography.Text style={{ color: color }}>
        {percentChange}%
      </Typography.Text>
    </div>
  );
};

export default PercentChangeIndicator;
