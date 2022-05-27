import accounting from 'accounting';
import React from 'react';
import { Sector } from 'recharts';

type ActivePieShapeProps = {
  fill: string;
  cx: number;
  cy: number;
  startAngle: number;
  endAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  value: any;
  payload: any;
};

const ActivePieShape = ({
  cx,
  cy,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  fill,
  payload,
  percent,
  value,
}: ActivePieShapeProps) => {
  return (
    <g style={{ cursor: 'pointer' }}>
      <text x={cx} y={cy} dy={-15} textAnchor='middle' fill={fill}>
        {payload.name}
      </text>
      <text
        x={cx}
        y={cy}
        dy={5}
        textAnchor='middle'
        fill='rgba(255, 255, 255, 0.85)'
      >
        {accounting.formatMoney(value)}
      </text>
      <text
        x={cx}
        y={cy}
        dy={25}
        textAnchor='middle'
        fill='rgba(255, 255, 255, 0.45)'
      >{`(${(percent * 100).toFixed(2)}%)`}</text>
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
