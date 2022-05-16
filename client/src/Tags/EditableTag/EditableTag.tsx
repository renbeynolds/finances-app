import { AutoComplete, Input, Tag } from 'antd';
import _ from 'lodash';
import { OptionData, OptionGroupData } from 'rc-select/lib/interface';
import React, { useState } from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { TransactionDTO } from '../../Transactions/TransactionDTO';
import { UpdateTransactionCMD } from '../../Transactions/UpdateTransactionCMD';
import { apiPut } from '../../Utils/api';
import { TagDTO } from '../TagDTO';
import { tagsState } from '../TagsState';

type EditableTagProps = {
  tagId: number;
  transactionId: number;
} & typeof defaultProps;

const defaultProps = {};

const EditableTag = ({
  tagId,
  transactionId,
}: EditableTagProps): JSX.Element => {
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

  const onSelect = (value: string, option: OptionData | OptionGroupData) => {
    apiPut<UpdateTransactionCMD, TransactionDTO>(
      `/api/transactions/${transactionId}`,
      { tagId: option.id }
    ).then((updatedTransaction) => {
      console.log(updatedTransaction);
      // setTagsState((currentTags) => [...currentTags, newTag]);
    });
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

  return (
    <Tag onClick={() => setEditing(true)} color={tag?.color}>
      {tag?.name}
    </Tag>
  );
};

export default EditableTag;
