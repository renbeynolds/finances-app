import { Col, Row } from 'antd';
import React from 'react';
import { useParams } from 'react-router';
import { TransactionTable } from '../../Transactions/TransactionTable';

const AccountInsights = (): JSX.Element => {
  const { accountId: accountIdString } = useParams();
  const accountId = parseInt(accountIdString!);

  return (
    <Row>
      <Col span={24}>
        <TransactionTable
          accountId={accountId}
          // tagId={tagId}
          // startDate={startDate}
          // endDate={endDate}
        />
      </Col>
    </Row>
  );
};

export default AccountInsights;
