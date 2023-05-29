import { Form, Input } from 'antd';
import _ from 'lodash';
import React from 'react';

type AccountFormFieldProps = {
  name: string;
  label: string;
  errors: IValidationError[];
  children?: React.ReactNode;
};

const AccountFormField = ({
  name,
  label,
  errors,
  children = <Input />,
}: AccountFormFieldProps): JSX.Element => {
  const fieldErrors = _.filter(errors, { param: name });

  return (
    <Form.Item
      name={name}
      label={label}
      validateTrigger='onBlur'
      {...(fieldErrors.length > 0 && {
        help: fieldErrors[0].msg,
        validateStatus: 'error',
      })}
    >
      {children}
    </Form.Item>
  );
};

export default AccountFormField;
