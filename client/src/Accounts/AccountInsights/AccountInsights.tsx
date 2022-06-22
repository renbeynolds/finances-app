import { Col, Row } from 'antd';
import React from 'react';
import { useParams } from 'react-router';
import { TransactionTable } from '../../Transactions/TransactionTable';

const AccountInsights = (): JSX.Element => {
  const { accountId: accountIdString } = useParams();
  const accountId = parseInt(accountIdString!);

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <TransactionTable accountId={accountId} />
      </Col>
    </Row>
  );
};

export default AccountInsights;
