import { PlusOutlined } from '@ant-design/icons';
import { AutoComplete, Input, Tag } from 'antd';
import _ from 'lodash';
import React, { useState } from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { TagDTO } from '../../../Tags/TagDTO';
import { tagsState } from '../../../Tags/TagsState';

interface EditableTagProps {
  tagId?: number;
  onSave: (tagId: number) => void;
}

const EditableTag = ({ tagId, onSave }: EditableTagProps): JSX.Element => {
  const [editing, setEditing] = useState<Boolean>(false);
  const tags = useRecoilValueLoadable(tagsState);

  if (tags.state !== 'hasValue') {
    return <Tag />;
  }

  const tagOptions: { id: number; value: string }[] = tags.contents.map(
    (t: TagDTO) => ({
      id: t.id,
      value: t.name,
    })
  );

  const onSelect = (value: string, option: any) => {
    onSave(option.id);
    setEditing(false);
  };

  if (editing) {
    return (
      <AutoComplete
        autoFocus={true}
        options={tagOptions}
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

  const tag = _.find(tags.contents, { id: tagId });

  if (!tagId) {
    return (
      <Tag style={{ cursor: 'pointer' }} onClick={() => setEditing(true)}>
        <PlusOutlined /> Add
      </Tag>
    );
  }

  return (
    <Tag
      onClick={() => setEditing(true)}
      color={tag?.color}
      style={{ cursor: 'pointer' }}
    >
      {tag?.name}
    </Tag>
  );
};

export default EditableTag;
