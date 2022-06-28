import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { Tooltip, Typography } from 'antd';
import React from 'react';

interface PercentChangeIndicatorProps {
  currentValue: number;
  previousValue: number;
  desiredChange?: 'increase' | 'decrease';
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
    (desiredChange === 'increase' && changeAmount > 0) ||
    (desiredChange === 'decrease' && changeAmount < 0)
      ? 'green'
      : desiredChange
      ? 'red'
      : undefined;

  return (
    <Tooltip
      title={`Amount has ${
        changeAmount > 0 ? 'increased' : 'decreased'
      } by ${percentChange}% compared to the previous number of selected days.`}
    >
      <div>
        {changeAmount > 0 ? (
          <CaretUpOutlined
            style={{ color: color, marginRight: '8px' }}
            data-testid='direction'
          />
        ) : (
          <CaretDownOutlined
            style={{ color: color, marginRight: '8px' }}
            data-testid='direction'
          />
        )}
        <Typography.Text style={{ color: color }} data-testid='value'>
          {percentChange}%
        </Typography.Text>
      </div>
    </Tooltip>
  );
};

export default PercentChangeIndicator;
