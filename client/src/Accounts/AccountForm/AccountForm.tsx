import { Button, Col, Form, Input, Row, Select } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { ROOT_URL } from '../../App';
import { apiPost } from '../../Utils';
import { AccountDTO } from '../AccountDTO';
import { accountsState } from '../AccountsState';
import { CreateAccountCMD } from '../CreateAccountCMD';
import AccountFormField from './AccountFormField';

const { Option } = Select;

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
  const [typeHeaderVisible, setTypeHeaderVisible] =
    React.useState<Boolean>(false);
  const [errors, setErrors] = React.useState<IValidationError[]>([{}]);
  const navigate = useNavigate();

  const onFinish = (values: CreateAccountCMD) => {
    apiPost<CreateAccountCMD, AccountDTO>('/api/accounts', values).then(
      (newAccount) => {
        setAccountsState((currentAccounts) => [...currentAccounts, newAccount]);
        navigate(ROOT_URL);
      }
    );
  };

  const onValuesChange = (changedValues: any, allValues: CreateAccountCMD) => {
    if (allValues.amountsType === 'septypecol') {
      setTypeHeaderVisible(true);
    }

    fetch('/api/accounts?validateOnly=true', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(allValues),
    })
      .then((response) => response.json())
      .then((data: IValidationData) => {
        setErrors(data.errors);
      });
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
      <Form onFinish={onFinish} onValuesChange={onValuesChange} {...layout}>
        <AccountFormField name='name' label='Name' errors={errors} />
        <AccountFormField
          name='dateHeader'
          label='Date Header'
          errors={errors}
        />
        <AccountFormField
          name='descriptionHeader'
          label='Description Header'
          errors={errors}
        />
        <AccountFormField
          name='amountHeader'
          label='Amount Header'
          errors={errors}
        />
        <AccountFormField
          name='amountsType'
          label='Amounts Type'
          errors={errors}
        >
          <Select>
            <Option value='negamtexp'>Negative Amount = Expense</Option>
            <Option value='posamtexp'>Postive Amount = Expense</Option>
            <Option value='septypecol'>Separate Income vs. Expense Col.</Option>
          </Select>
        </AccountFormField>
        {typeHeaderVisible && (
          <AccountFormField
            name='typeHeader'
            label='Type Header'
            errors={errors}
          />
        )}
        <AccountFormField
          name='startingAmount'
          label='Starting Amount'
          errors={errors}
        >
          <Input prefix='$' type='number' />
        </AccountFormField>
        <AccountFormField name='color' label='Color' errors={errors} />
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button
            type='primary'
            htmlType='submit'
            disabled={errors && errors.length > 0}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AccountForm;
