import { Col, Row } from 'antd';
import { useParams } from 'react-router';
import { TransactionTable } from '../../Transactions/TransactionTable';
import { AccountBalanceOverTimeChart } from './AccountBalanceOverTimeChart';

const AccountInsights = (): JSX.Element => {
  const { accountId: accountIdString } = useParams();
  const accountId = parseInt(accountIdString!);

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <AccountBalanceOverTimeChart />
        </Col>
        <Col span={24}>
          <TransactionTable accountId={accountId} />
        </Col>
      </Row>
    </>
  );
};

export default AccountInsights;
