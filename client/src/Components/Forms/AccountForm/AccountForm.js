import { Button, Checkbox, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router';
import { requestCreateAccount, requestFetchAccount, requestUpdateAccount } from '../../../Redux/Accounts/actions';
import './styles.scss';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 8,
  },
};

function AccountForm() {

  const dispatch = useDispatch();
  const history = useHistory();
  const accountIdToEdit = useRouteMatch().params.accountId;
  const [values, setValues] = useState({});
  const [form] = Form.useForm();

  useEffect(() => {
    const getAccountToEdit = async() => {
      const request = await dispatch(requestFetchAccount(accountIdToEdit));
      const initialValues = {
        name: request.payload.name,
        dateHeader: request.payload.dateHeader,
        descriptionHeader: request.payload.descriptionHeader,
        amountHeader: request.payload.amountHeader,
        amountsInverted: request.payload.amountsInverted,
        startingAmount: request.payload.startingAmount,
        color: request.payload.color || '#999999'
      };
      form.setFieldsValue(initialValues);
      setValues(initialValues);
    };
    if (accountIdToEdit) {
      getAccountToEdit();
    }
  }, [dispatch, form, accountIdToEdit]);

  const onFinish = (account) => {
    if (accountIdToEdit) {
      dispatch(requestUpdateAccount({ id: accountIdToEdit, account: account }));
    } else {
      dispatch(requestCreateAccount(account));
    }
    history.push('/accounts');
  };

  return (
    <Form
      {...layout}
      form={form}
      onFinish={onFinish}
      onValuesChange={(updated, all) => {
        setValues(all);
      }}
    >
      <Form.Item
        label='Name'
        name='name'
        rules={[
          {
            required: true,
            message: 'Please input account name!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label='Date Header'
        name='dateHeader'
        rules={[
          {
            required: true,
            message: 'Please input Date Header!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label='Description Header'
        name='descriptionHeader'
        rules={[
          {
            required: true,
            message: 'Please input Description Header!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label='Amount Header'
        name='amountHeader'
        rules={[
          {
            required: true,
            message: 'Please input Amount Header!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label='Starting Amount'
        name='startingAmount'
      >
        <Input prefix='$' type='number' />
      </Form.Item>
      <Form.Item label='Color' className='AccountForm__color'>
        <Form.Item name='color'>
          <Input />
        </Form.Item>
        <div
          style={{
            borderRadius: '2px',
            width: '90px',
            height: '32px',
            marginLeft: '30px',
            backgroundColor: values.color
          }}
        ></div>
      </Form.Item>
      <Form.Item
        {...tailLayout}
        name='amountsInverted'
        valuePropName='checked'>
        <Checkbox>Amounts Inverted</Checkbox>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type='primary' htmlType='submit'>Submit</Button>
      </Form.Item>
    </Form>
  );
}

export default AccountForm;