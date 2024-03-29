import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';

type EditableCellProps = {
  value: any;
  title: string;
  dataIndex: string;
  onSave: (value: any) => void;
  required?: boolean;
};

const EditableCell = ({
  value,
  dataIndex,
  title,
  onSave,
  required = false,
}: EditableCellProps): JSX.Element => {
  const [form] = Form.useForm();
  const [editing, setEditing] = useState<boolean>(false);

  const save = async () => {
    const values = await form.validateFields();
    onSave(values[dataIndex]);
    setEditing(false);
  };

  if (editing) {
    return (
      <Form
        form={form}
        initialValues={{
          [dataIndex]: value,
        }}
      >
        <Form.Item
          style={{ margin: 0 }}
          name={dataIndex}
          rules={
            required
              ? [
                  {
                    required: true,
                    message: `${title} is required.`,
                  },
                ]
              : []
          }
        >
          <Input
            onPressEnter={save}
            onBlur={save}
            style={{ maxWidth: '250px' }}
          />
        </Form.Item>
      </Form>
    );
  } else if (value) {
    return (
      <div
        onClick={() => setEditing(true)}
        style={{
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          cursor: 'pointer',
        }}
      >
        {value}
      </div>
    );
  } else {
    return (
      <Button type='dashed' onClick={() => setEditing(true)} size='small'>
        +
      </Button>
    );
  }
};

export default EditableCell;
