import { Col, Row } from 'antd';
import React from 'react';
import { IncomeVsExpenseChart } from './IncomeVsExpenseChart';

const Overview = (): JSX.Element => {
  return (
    <Row gutter={16}>
      <Col span={12}>
        <IncomeVsExpenseChart />
      </Col>
    </Row>
  );
};

export default Overview;
