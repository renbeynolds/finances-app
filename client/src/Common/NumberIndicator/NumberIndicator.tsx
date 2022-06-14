import { Card, Typography } from 'antd';
import { TitleProps } from 'antd/lib/typography/Title';
import React from 'react';

interface NumberIndicatorProps {
  onValueClick?: () => void;
  value: string;
  title: string;
  titleProps?: TitleProps;
}

const NumberIndicator = ({
  value,
  title,
  onValueClick,
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
          {value}
        </Typography.Title>
      </div>
    </Card>
  );
};

export default NumberIndicator;
