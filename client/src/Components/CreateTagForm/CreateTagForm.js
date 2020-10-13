import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Tag } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { requestCreateTag } from '../../Redux/Tags/actions';
import './styles.scss';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
};

const regexItemLayout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 8
  },
};

const regexItemLayoutWithOutLabel = {
  wrapperCol: {
    offset: 8,
    span: 8
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 8,
  },
};


function CreateTagForm() {

  const dispatch = useDispatch();
  const history = useHistory();
  const [colorValue, setColorValue] = useState('');

  const onFinish = (tag) => {
    // TODO: Figure out how to make `color` included in form values
    dispatch(requestCreateTag({...tag, color: colorValue}));
    history.push('/tags');
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
            message: 'Please input tag name!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        className='CreateTagForm__color'
        label='Color'
        name='color'
        rules={[]}
      >
        <Input placeholder='#2db7f5' onChange={(e) => setColorValue(e.target.value)}/>
        { colorValue &&
          <Tag color={colorValue}>Tag Preview</Tag>
        }
      </Form.Item>
      <Form.List
        name='regexes'
      >
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map((field, index) => (
                <Form.Item
                  {...(index === 0 ? regexItemLayout : regexItemLayoutWithOutLabel)}
                  label={index === 0 ? 'Regexes' : ''}
                  required={false}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[]}
                    noStyle
                  >
                    <Input placeholder='regex string' style={{ width: '60%' }} />
                  </Form.Item>
                  <MinusCircleOutlined
                    className='dynamic-delete-button'
                    style={{ margin: '0 8px' }}
                    onClick={() => {
                      remove(field.name);
                    }}
                  />
                </Form.Item>
              ))}
              <Form.Item {...regexItemLayoutWithOutLabel}>
                <Button
                  type='dashed'
                  onClick={() => {
                    add();
                  }}
                  style={{ width: '60%' }}
                >
                  <PlusOutlined /> Add Regex
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>
      <Form.Item {...tailLayout}>
        <Button type='primary' htmlType='submit'>Submit</Button>
      </Form.Item>
    </Form>
  );
}

export default CreateTagForm;