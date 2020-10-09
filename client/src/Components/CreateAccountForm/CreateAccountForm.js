import { Button, Form, Input } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { requestCreateAccount } from '../../Redux/Accounts/actions';

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 8,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 8,
  },
};

function CreateAccountForm() {

  const dispatch = useDispatch();
  const history = useHistory();

  const onFinish = (account) => {
    dispatch(requestCreateAccount(account));
    history.push('/accounts');
  };

  return (
    <Form
      {...layout}
      name='basic'
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
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
      <Form.Item {...tailLayout}>
        <Button type='primary' htmlType='submit'>
                    Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default CreateAccountForm;