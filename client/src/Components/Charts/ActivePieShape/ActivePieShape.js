import accounting from 'accounting-js';
import React from 'react';
import { Sector } from 'recharts';

const ActivePieShape = (props) => {

  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value } = props;

  return (
    <g>
      <text x={cx} y={cy} dy={-15}textAnchor='middle' fill={fill}>{payload.name}</text>
      <text x={cx} y={cy} dy={5}  textAnchor='middle' fill='#333'>{accounting.formatMoney(value)}</text>
      <text x={cx} y={cy} dy={25} textAnchor='middle' fill='#999'>{`(${(percent * 100).toFixed(2)}%)`}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  );
};

export default ActivePieShape;