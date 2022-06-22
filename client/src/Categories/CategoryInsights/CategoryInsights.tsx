import accounting from 'accounting';
import { Col, Row } from 'antd';
import React from 'react';
import { useParams } from 'react-router';
import { useRecoilValue } from 'recoil';
import { AverageOverMonthsSelector } from '../../Common/AverageOverMonthsSelector';
import { NumberIndicator } from '../../Common/NumberIndicator';
import { DateRangePicker } from '../../Filters/DateRangePicker';
import {
  endDateFilterAtom,
  startDateFilterAtom,
} from '../../Filters/FilterState';
import { TransactionTable } from '../../Transactions/TransactionTable';
import CategorySpendingOverTimeChart from './CategorySpendingOverTimeChart/CategorySpendingOverTimeChart';
import { useAverageCategorySpendingData } from './useAverageCategorySpendingData';

const CategoryInsights = (): JSX.Element => {
  const { categoryId: categoryIdString } = useParams();
  const [numMonthsToAverage, setNumMonthsToAverage] = React.useState<number>(3);
  const categoryId = parseInt(categoryIdString!);
  const startDate = useRecoilValue(startDateFilterAtom);
  const endDate = useRecoilValue(endDateFilterAtom);
  const averageCategorySpending = useAverageCategorySpendingData(
    categoryId,
    numMonthsToAverage
  );

  return (
    <Row gutter={[16, 16]}>
      <Col span={12}>
        <CategorySpendingOverTimeChart categoryId={categoryId} />
      </Col>
      <Col span={12}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <AverageOverMonthsSelector
              value={numMonthsToAverage}
              onChange={setNumMonthsToAverage}
            />
          </Col>
          <Col span={8}>
            <NumberIndicator
              title='Total'
              value={accounting.formatMoney(averageCategorySpending.avg)}
            />
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <DateRangePicker />
      </Col>
      <Col span={24}>
        <TransactionTable
          categoryId={categoryId}
          startDate={startDate}
          endDate={endDate}
        />
      </Col>
    </Row>
  );
};

export default CategoryInsights;
