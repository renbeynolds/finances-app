import { InputNumber, Typography } from 'antd';
import React from 'react';

interface AverageOverMonthsSelectorProps {
  value: number;
  onChange: (newValue: number | null) => void;
}

const AverageOverMonthsSelector = ({
  value,
  onChange,
}: AverageOverMonthsSelectorProps): JSX.Element => {
  return (
    <div style={{ display: 'flex' }}>
      <Typography.Title level={5}>Average Over Last</Typography.Title>
      <div>
        <InputNumber
          min={3}
          max={12}
          value={value}
          onChange={onChange}
          size='small'
          style={{
            marginLeft: '8px',
            marginRight: '8px',
            width: '56px',
          }}
        />
      </div>
      <Typography.Title level={5}>Months</Typography.Title>
    </div>
  );
};

export default AverageOverMonthsSelector;
