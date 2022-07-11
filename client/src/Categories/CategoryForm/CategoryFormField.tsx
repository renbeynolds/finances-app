import { Form, FormItemProps, Input } from 'antd';
import React, { useState } from 'react';
import { serverValidator } from '../../Utils';

type CategoryFormFieldProps = {
  name: string;
  label?: string;
  children?: React.ReactNode;
  initialValue?: any;
  itemProps?: FormItemProps;
};

const CategoryFormField = ({
  name,
  label,
  children = <Input />,
  initialValue,
  itemProps,
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
      {...itemProps}
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
