import { Form, Input } from 'antd';
import React, { useState } from 'react';
import { serverValidator } from '../../Utils';

type TagFormFieldProps = {
  name: string;
  label: string;
  children?: React.ReactNode;
};

const TagFormField = ({
  name,
  label,
  children = <Input />,
}: TagFormFieldProps): JSX.Element => {
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
          validator: serverValidator(name, '/api/tags', setError),
        },
      ]}
    >
      {children}
    </Form.Item>
  );
};

export default TagFormField;
