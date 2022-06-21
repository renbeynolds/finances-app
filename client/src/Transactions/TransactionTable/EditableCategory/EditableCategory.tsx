import { PlusOutlined } from '@ant-design/icons';
import { AutoComplete, Input, Tag } from 'antd';
import _ from 'lodash';
import React, { useState } from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { categoriesState } from '../../../Categories/CategoriesState';
import { CategoryDTO } from '../../../Categories/CategoryDTO';

interface EditableCategoryProps {
  categoryId?: number;
  onSave: (categoryId: number) => void;
}

const EditableCategory = ({
  categoryId,
  onSave,
}: EditableCategoryProps): JSX.Element => {
  const [editing, setEditing] = useState<Boolean>(false);
  const categories = useRecoilValueLoadable(categoriesState);

  if (categories.state !== 'hasValue') {
    return <Tag />;
  }

  const categoryOptions: { id: number; value: string }[] =
    categories.contents.map((t: CategoryDTO) => ({
      id: t.id,
      value: t.name,
    }));

  const onSelect = (value: string, option: any) => {
    onSave(option.id);
    setEditing(false);
  };

  if (editing) {
    return (
      <AutoComplete
        autoFocus={true}
        options={categoryOptions}
        filterOption={(inputValue, option) =>
          option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
        onSelect={onSelect}
        onBlur={() => setEditing(false)}
      >
        <Input size='small' />
      </AutoComplete>
    );
  }

  const category = _.find(categories.contents, { id: categoryId });

  if (!categoryId) {
    return (
      <Tag style={{ cursor: 'pointer' }} onClick={() => setEditing(true)}>
        <PlusOutlined /> Add
      </Tag>
    );
  }

  return (
    <Tag
      onClick={() => setEditing(true)}
      color={category?.color}
      style={{ cursor: 'pointer' }}
    >
      {category?.name}
    </Tag>
  );
};

export default EditableCategory;
