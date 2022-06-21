import { Form, Input } from 'antd';
import React, { useState } from 'react';
import { serverValidator } from '../../Utils';

type CategoryFormFieldProps = {
  name: string;
  label: string;
  children?: React.ReactNode;
  initialValue?: any;
};

const CategoryFormField = ({
  name,
  label,
  children = <Input />,
  initialValue,
}: CategoryFormFieldProps): JSX.Element => {
  const [error, setError] = useState<string | null>(null);

  return (
    <Form.Item
      initialValue={initialValue}
      name={name}
      label={label}
      validateTrigger='onBlur'
      {...(error && {
        help: error,
        validateStatus: 'error',
      })}
      rules={[
        {
          validator: serverValidator(name, '/api/categories', setError),
        },
      ]}
    >
      {children}
    </Form.Item>
  );
};

export default CategoryFormField;
