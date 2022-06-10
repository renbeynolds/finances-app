import { Col, Row } from 'antd';
import React from 'react';
import { AverageExpenseIndicator } from './AverageExpenseIndicator';
import { AverageIncomeIndicator } from './AverageIncomeIndicator';
import { IncomeVsExpenseChart } from './IncomeVsExpenseChart';

const Trends = (): JSX.Element => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={12}>
        <IncomeVsExpenseChart />
      </Col>
      {/* Putting everything "in one row" is a workaround for vertical
          row spacing not working correctly:
          https://github.com/ant-design/ant-design/issues/4410 */}
      <Col span={12}></Col>
      <Col span={4}>
        <AverageExpenseIndicator />
      </Col>
      <Col span={4}>
        <AverageIncomeIndicator />
      </Col>
    </Row>
  );
};

export default Trends;
