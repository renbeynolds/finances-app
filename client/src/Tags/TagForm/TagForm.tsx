import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Spin } from 'antd';
import Title from 'antd/lib/typography/Title';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { ROOT_URL } from '../../App';
import { apiPost } from '../../Utils';
import { apiPut } from '../../Utils/api';
import { capitalized } from '../../Utils/StringUtils';
import { CreateTagCMD } from '../CreateTagCMD';
import { TagDTO } from '../TagDTO';
import { tagsState } from '../TagsState';
import TagFormField from './TagFormField';
import { useRouteParamTag } from './useRouteParamTag';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
};

const prefixItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
};

const prefixItemLayoutWithoutLabel = {
  wrapperCol: {
    offset: 8,
    span: 8,
  },
};

type TagFormProps = {
  intent: 'create' | 'edit';
};

const TagForm = ({ intent }: TagFormProps): JSX.Element => {
  const setTagsState = useSetRecoilState(tagsState);
  const navigate = useNavigate();
  const [form] = Form.useForm<CreateTagCMD>();

  const tagToEdit = useRouteParamTag();

  useEffect(() => {
    form.resetFields();
  }, [tagToEdit, form]);

  if (intent === 'edit' && !tagToEdit) {
    return <Spin />;
  }

  const onFinish = (values: CreateTagCMD) => {
    if (intent === 'create') {
      apiPost<CreateTagCMD, TagDTO>('/api/tags', values).then((newTag) => {
        setTagsState((currentTags) => [...currentTags, newTag]);
        navigate(ROOT_URL);
      });
    } else {
      console.log(values);
      apiPut<CreateTagCMD, TagDTO>(`/api/tags/${tagToEdit?.id}`, values).then(
        (updatedTag) => {
          setTagsState((currentTags) =>
            currentTags.map((t) => (t.id === updatedTag.id ? updatedTag : t))
          );
          navigate(ROOT_URL);
        }
      );
    }
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
          <Title>{capitalized(intent)} Tag</Title>
        </Col>
      </Row>
      <Form onFinish={onFinish} {...layout} form={form}>
        <TagFormField name='name' label='Name' initialValue={tagToEdit?.name} />
        <TagFormField
          name='color'
          label='Color'
          initialValue={tagToEdit?.color}
        />

        <Form.List
          name='prefixRules'
          initialValue={tagToEdit ? tagToEdit.prefixRules : []}
        >
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Form.Item
                    {...(index === 0
                      ? prefixItemLayout
                      : prefixItemLayoutWithoutLabel)}
                    label={index === 0 ? 'Prefix Rules' : ''}
                    required={false}
                    key={field.key}
                  >
                    <Form.Item
                      {...field}
                      validateTrigger={['onChange', 'onBlur']}
                      rules={[]}
                      noStyle
                    >
                      <Input placeholder='pattern' style={{ width: '60%' }} />
                    </Form.Item>
                    <MinusCircleOutlined
                      style={{ margin: '0 8px' }}
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  </Form.Item>
                ))}
                <Form.Item {...prefixItemLayoutWithoutLabel}>
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
