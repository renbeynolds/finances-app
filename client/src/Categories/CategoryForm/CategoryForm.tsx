import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select, Spin } from 'antd';
import Title from 'antd/lib/typography/Title';
import _ from 'lodash';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import { ROOT_URL } from '../../App';
import { apiPost } from '../../Utils';
import { apiPut } from '../../Utils/api';
import { capitalized } from '../../Utils/StringUtils';
import { categoriesState } from '../CategoriesState';
import { CategoryDTO } from '../CategoryDTO';
import { CreateCategoryCMD } from '../CreateCategoryCMD';
import CategoryFormField from './CategoryFormField';
import { useRouteParamCategory } from './useRouteParamCategory';

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

type CategoryFormProps = {
  intent: 'create' | 'edit';
};

const CategoryForm = ({ intent }: CategoryFormProps): JSX.Element => {
  const setCategoriesState = useSetRecoilState(categoriesState);
  const categories = useRecoilValueLoadable(categoriesState);
  const navigate = useNavigate();
  const [form] = Form.useForm<CreateCategoryCMD>();

  const categoryToEdit = useRouteParamCategory();

  const categoryOptions: { value: number; label: string }[] =
    categories.state === 'hasValue'
      ? categories.contents.map((t: CategoryDTO) => ({
          label: t.name,
          value: t.id,
        }))
      : [];

  useEffect(() => {
    form.resetFields();
  }, [categoryToEdit, form]);

  if (intent === 'edit' && !categoryToEdit) {
    return <Spin />;
  }

  const onFinish = (values: CreateCategoryCMD) => {
    if (intent === 'create') {
      apiPost<CreateCategoryCMD, CategoryDTO>('/api/categories', values).then(
        (newCategory) => {
          setCategoriesState((currentCategories) => [
            ...currentCategories,
            newCategory,
          ]);
          navigate(ROOT_URL);
        }
      );
    } else {
      console.log(values);
      apiPut<CreateCategoryCMD, CategoryDTO>(
        `/api/categories/${categoryToEdit?.id}`,
        values
      ).then((updatedCategory) => {
        setCategoriesState((currentCategories) =>
          currentCategories.map((t) =>
            t.id === updatedCategory.id ? updatedCategory : t
          )
        );
        navigate(ROOT_URL);
      });
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
          <Title>{capitalized(intent)} Category</Title>
        </Col>
      </Row>
      <Form onFinish={onFinish} {...layout} form={form}>
        <CategoryFormField
          name='name'
          label='Name'
          initialValue={categoryToEdit?.name}
        />
        <CategoryFormField
          name='parentCategoryId'
          label='Parent Category'
          initialValue={categoryToEdit?.parentCategoryId}
        >
          <Select
            showSearch
            options={categoryOptions}
            disabled={_.find(categories.contents, {
              parentCategoryId: categoryToEdit?.id,
            })}
            allowClear
            filterOption={(inputValue, option) =>
              option?.label.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
          >
            <Input />
          </Select>
        </CategoryFormField>
        <CategoryFormField
          name='color'
          label='Color'
          initialValue={categoryToEdit?.color}
        />
        <Form.List
          name='prefixRules'
          initialValue={categoryToEdit ? categoryToEdit.prefixRules : []}
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

export default CategoryForm;
