import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router';
import { requestCreateTag, requestFetchTag, requestUpdateTag } from '../../../Redux/Tags/actions';
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


function TagForm() {

  const dispatch = useDispatch();
  const history = useHistory();
  const tagIdToEdit = useRouteMatch().params.tagId;
  const [values, setValues] = useState({});
  const [form] = Form.useForm();

  useEffect(() => {
    const getTagToEdit = async() => {
      const request = await dispatch(requestFetchTag(tagIdToEdit));
      const initialValues = {
        name: request.payload.name,
        color: request.payload.color,
        regexes: request.payload.regexes.map(r => r.pattern)
      };
      form.setFieldsValue(initialValues);
      setValues(initialValues);
    };
    if (tagIdToEdit) {
      getTagToEdit();
    }
  }, [dispatch, form, tagIdToEdit]);

  const onFinish = (tag) => {
    if (tagIdToEdit) {
      dispatch(requestUpdateTag({ id: tagIdToEdit, tag: tag }));
    } else {
      dispatch(requestCreateTag(tag));
    }
    history.push('/tags');
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
            message: 'Please input tag name!',
          },
        ]}
        normalize={value => (value || '').toUpperCase()}
      >
        <Input />
      </Form.Item>
      <Form.Item
        className='TagForm__color'
        label='Color'
      >
        <Form.Item name='color'>
          <Input placeholder='#2db7f5' />
        </Form.Item>
        <Tag color={values.color}>{values.name}</Tag>
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

export default TagForm;