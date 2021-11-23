import { Button, Col, Form, Input, Row, Switch } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { ROOT_URL } from '../../App';
import { accountsState } from '../../State/AccountsState';
import { apiPost } from '../../Utils';
import AccountFormField from './AccountFormField';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
};

const AccountForm = (): JSX.Element => {
  const setAccountsState = useSetRecoilState(accountsState);
  const navigate = useNavigate();

  const onFinish = (values: ICreateAccountCMD) => {
    apiPost<ICreateAccountCMD, IAccount>('/api/accounts', values).then(
      (newAccount) => {
        setAccountsState((currentAccounts) => [...currentAccounts, newAccount]);
        navigate(ROOT_URL);
      }
    );
  };

  return (
    <div
      style={{
        marginTop: '-55px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <Row>
        <Col span={8} />
        <Col span={8}>
          <Title>Create Account</Title>
        </Col>
      </Row>
      <Form onFinish={onFinish} {...layout}>
        <AccountFormField name='name' label='Name' />
        <AccountFormField name='dateHeader' label='Date Header' />
        <AccountFormField name='descriptionHeader' label='Description Header' />
        <AccountFormField name='amountHeader' label='Amount Header' />
        <AccountFormField name='amountsInverted' label='Amounts Inverted'>
          <Switch />
        </AccountFormField>
        <AccountFormField name='startingAmount' label='Starting Amount'>
          <Input prefix='$' type='number' />
        </AccountFormField>
        <AccountFormField name='color' label='Color' />
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AccountForm;
