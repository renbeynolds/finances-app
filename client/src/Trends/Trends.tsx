import accounting from 'accounting';
import { Col, Row } from 'antd';
import React from 'react';
import { AverageOverMonthsSelector } from '../Common/AverageOverMonthsSelector';
import { NumberIndicator } from '../Common/NumberIndicator';
import { AccountsTotalChart } from './AccountsTotalChart';
import { IncomeVsExpenseChart } from './IncomeVsExpenseChart';
import { useAverageExpenseData } from './useAverageExpenseData';
import { useAverageIncomeData } from './useAverageIncomeData';

const Trends = (): JSX.Element => {
  const [numMonthsToAverage, setNumMonthsToAverage] = React.useState<
    number | null
  >(3);
  const averageIncomeData = useAverageIncomeData(numMonthsToAverage!);
  const averageExpenseData = useAverageExpenseData(numMonthsToAverage!);

  const averageNet =
    averageIncomeData.avg && averageExpenseData.avg
      ? parseFloat(averageIncomeData.avg) + parseFloat(averageExpenseData.avg)
      : 0;

  return (
    <Row gutter={[16, 16]}>
      <Col span={12}>
        <IncomeVsExpenseChart />
      </Col>
      <Col span={12}>
        <Row gutter={[16, 16]}>
          {/* Putting everything "in one row" is a workaround for vertical
            row spacing not working correctly:
            https://github.com/ant-design/ant-design/issues/4410 */}
          <Col span={24}>
            <AverageOverMonthsSelector
              value={numMonthsToAverage!}
              onChange={setNumMonthsToAverage}
            />
          </Col>
          <Col span={8}>
            <NumberIndicator
              title='Expense'
              value={averageExpenseData.avg}
              formatValue={accounting.formatMoney}
              titleProps={{
                type: 'danger',
              }}
            />
          </Col>
          <Col span={8}>
            <NumberIndicator
              title='Income'
              value={averageIncomeData.avg}
              formatValue={accounting.formatMoney}
              titleProps={{
                type: 'success',
              }}
            />
          </Col>
          <Col span={8}>
            <NumberIndicator
              title='Net'
              value={averageNet}
              formatValue={accounting.formatMoney}
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
      <Col span={12}>
        <AccountsTotalChart />
      </Col>
    </Row>
  );
};

export default Trends;
