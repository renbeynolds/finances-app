import accounting from 'accounting';
import { Col, InputNumber, Row, Typography } from 'antd';
import React, { useState } from 'react';
import { NumberIndicator } from '../Common/NumberIndicator';
import { IncomeVsExpenseChart } from './IncomeVsExpenseChart';
import { useAverageExpenseData } from './useAverageExpenseData';
import { useAverageIncomeData } from './useAverageIncomeData';

const Trends = (): JSX.Element => {
  const [numMonthsToAverage, setNumMonthsToAverage] = useState<number>(3);
  const averageIncomeData = useAverageIncomeData(numMonthsToAverage);
  const averageExpenseData = useAverageExpenseData(numMonthsToAverage);

  const averageNet =
    averageIncomeData.avg && averageExpenseData.avg
      ? parseFloat(averageIncomeData.avg) + parseFloat(averageExpenseData.avg)
      : 0;

  return (
    <Row gutter={[16, 16]}>
      <Col span={12}>
        <IncomeVsExpenseChart />
      </Col>
      {/* Putting everything "in one row" is a workaround for vertical
          row spacing not working correctly:
          https://github.com/ant-design/ant-design/issues/4410 */}
      <Col span={12}></Col>
      <Col span={12}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <div style={{ display: 'flex' }}>
              <Typography.Title level={5}>Last</Typography.Title>
              <div>
                <InputNumber
                  min={3}
                  max={12}
                  value={numMonthsToAverage}
                  onChange={setNumMonthsToAverage}
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
          </Col>
          <Col span={8}>
            <NumberIndicator
              title='Avg Expense'
              value={accounting.formatMoney(averageExpenseData.avg)}
              titleProps={{
                type: 'danger',
              }}
            />
          </Col>
          <Col span={8}>
            <NumberIndicator
              title='Avg Income'
              value={accounting.formatMoney(averageIncomeData.avg)}
              titleProps={{
                type: 'success',
              }}
            />
          </Col>
          <Col span={8}>
            <NumberIndicator
              title='Avg Net'
              value={accounting.formatMoney(averageNet)}
              titleProps={{
                type:
                  averageNet > 0
                    ? 'success'
                    : averageNet < 0
                    ? 'danger'
                    : undefined,
              }}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Trends;
