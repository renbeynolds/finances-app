import { Col, Row } from 'antd';
import React from 'react';
import { IncomeVsExpenseChart } from './IncomeVsExpenseChart';

const Trends = (): JSX.Element => {
  return (
    <Row gutter={16}>
      <Col span={12}>
        <IncomeVsExpenseChart />
      </Col>
    </Row>
  );
};

export default Trends;
