import { Form, Input } from 'antd';
import React, { useState } from 'react';
import { serverValidator } from '../../Utils';

type AccountFormFieldProps = {
  name: string;
  label: string;
  children?: React.ReactNode;
};

const AccountFormField = ({
  name,
  label,
  children = <Input />,
}: AccountFormFieldProps): JSX.Element => {
  const [error, setError] = useState<string | null>(null);

  return (
    <Form.Item
      name={name}
      label={label}
      validateTrigger='onBlur'
      {...(error && {
        help: error,
        validateStatus: 'error',
      })}
      rules={[
        {
          validator: serverValidator(name, '/api/accounts', setError),
        },
      ]}
    >
      {children}
    </Form.Item>
  );
};

export default AccountFormField;
