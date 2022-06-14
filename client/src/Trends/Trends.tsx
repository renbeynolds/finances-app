import accounting from 'accounting';
import { Col, Row } from 'antd';
import React from 'react';
import { NumberIndicator } from '../Common/NumberIndicator';
import { IncomeVsExpenseChart } from './IncomeVsExpenseChart';
import { useAverageExpenseData } from './useAverageExpenseData';
import { useAverageIncomeData } from './useAverageIncomeData';

const Trends = (): JSX.Element => {
  const averageIncomeData = useAverageIncomeData();
  const averageExpenseData = useAverageExpenseData();
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
        <NumberIndicator
          title='Average Expense (3 months)'
          value={accounting.formatMoney(averageExpenseData.avg)}
          titleProps={{
            type: 'danger',
          }}
        />
      </Col>
      <Col span={4}>
        <NumberIndicator
          title='Average Income (3 months)'
          value={accounting.formatMoney(averageIncomeData.avg)}
          titleProps={{
            type: 'success',
          }}
        />
      </Col>
    </Row>
  );
};

export default Trends;
