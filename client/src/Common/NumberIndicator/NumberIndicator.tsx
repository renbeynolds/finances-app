import { Card, Typography } from 'antd';
import { TitleProps } from 'antd/lib/typography/Title';
import React from 'react';
import { PercentChangeIndicator } from './PercentChangeIndicator';

interface NumberIndicatorProps {
  onValueClick?: () => void;
  value: number;
  previousValue?: number;
  desiredChange?: 'increase' | 'decrease';
  title: string;
  titleProps?: TitleProps;
  formatValue?: (value: number) => string;
}

const NumberIndicator = ({
  value,
  previousValue,
  desiredChange,
  title,
  onValueClick,
  formatValue,
  titleProps = {},
}: NumberIndicatorProps): JSX.Element => {
  return (
    <Card title={title} bordered={false}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Typography.Title
          level={3}
          onClick={onValueClick}
          style={{ cursor: onValueClick ? 'pointer' : 'default' }}
          {...titleProps}
        >
          {formatValue ? formatValue(value) : value}
        </Typography.Title>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {previousValue && (
          <PercentChangeIndicator
            currentValue={value}
            previousValue={previousValue}
            desiredChange={desiredChange}
          />
        )}
      </div>
    </Card>
  );
};

export default NumberIndicator;
