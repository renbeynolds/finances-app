import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { tagsState } from '../../State/TagsState';
import { apiPost } from '../../Utils';
import { ROOT_URL } from '../AppLayout/AppLayout';
import TagFormField from './TagFormField';

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
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
};

const regexItemLayoutWithoutLabel = {
  wrapperCol: {
    offset: 8,
    span: 8,
  },
};

const TagForm = (): JSX.Element => {
  const setTagsState = useSetRecoilState(tagsState);
  const navigate = useNavigate();

  const onFinish = (values: ICreateTagCMD) => {
    apiPost<ICreateTagCMD, ITag>('/api/tags', values).then((newTag) => {
      setTagsState((currentTags) => [...currentTags, newTag]);
      navigate(ROOT_URL);
    });
  };

  return (
    <div
      style={{
        marginTop: '-55px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <Row>
        <Col span={8} />
        <Col span={8}>
          <Title>Create Tag</Title>
        </Col>
      </Row>
      <Form onFinish={onFinish} {...layout}>
        <TagFormField name='name' label='Name' />
        <TagFormField name='color' label='Color' />

        <Form.List name='regexPatterns' initialValue={[]}>
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Form.Item
                    {...(index === 0
                      ? regexItemLayout
                      : regexItemLayoutWithoutLabel)}
                    label={index === 0 ? 'Regex Patterns' : ''}
                    required={false}
                    key={field.key}
                  >
                    <Form.Item
                      {...field}
                      validateTrigger={['onChange', 'onBlur']}
                      rules={[]}
                      noStyle
                    >
                      <Input
                        placeholder='regex string'
                        style={{ width: '60%' }}
                      />
                    </Form.Item>
                    <MinusCircleOutlined
                      style={{ margin: '0 8px' }}
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  </Form.Item>
                ))}
                <Form.Item {...regexItemLayoutWithoutLabel}>
                  <Button
                    type='dashed'
                    onClick={() => {
                      add();
                    }}
                    style={{ width: '60%' }}
                  >
                    <PlusOutlined /> Add Pattern
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TagForm;
