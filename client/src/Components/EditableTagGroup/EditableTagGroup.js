import { PlusOutlined } from '@ant-design/icons';
import { AutoComplete, Input, Tag } from 'antd';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTransactionTagFilter } from '../../Redux/Filters/reducer';
import { requestFetchTags } from '../../Redux/Tags/actions';
import { selectTagOptions } from '../../Redux/Tags/selectors';
import { requestUpdateTransaction } from '../../Redux/Transactions/actions';
import './styles.scss';

function EditableTagGroup(props) {

  const { transaction } = props;

  const dispatch = useDispatch();
  const [addVisible, setAddVisible] = useState(false);
  const tagNameOptions = useSelector(state => selectTagOptions(state, transaction.tags));

  // Fetch available tags when adding one to a transaction
  useEffect(() => {
    if (addVisible) {
      dispatch(requestFetchTags());
    }
  }, [dispatch, addVisible]);

  const onAddTag = (value, option) => {
    dispatch(requestUpdateTransaction({
      id: transaction.id, transaction: {
        ...transaction, tags: [...transaction.tags, option]
      }
    }));
    setAddVisible(false);
  };

  const onRemoveTag = (tagId) => {
    dispatch(requestUpdateTransaction({
      id: transaction.id, transaction: {
        ...transaction, tags: transaction.tags.filter(t => t.id !== tagId)
      }
    }));
  };

  return (
    <>
      {transaction.tags.map((tag) => (
        <Tag
          key={tag.id}
          color={tag.color}
          closable={true}
          onClose={() => onRemoveTag(tag.id)}
          onClick={() => dispatch(addTransactionTagFilter(tag))}
        >{tag.name}</Tag>
      ))}

      {addVisible && (
        <AutoComplete
          autoFocus={true}
          options={tagNameOptions}
          filterOption={(inputValue, option) =>
            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
          onSelect={onAddTag}
          onBlur={() => setAddVisible(false)}
        ><Input size='small' /></AutoComplete>
      )}

      {!addVisible && (
        <Tag className='EditableTagGroup__add-button' onClick={() => setAddVisible(true)}>
          <PlusOutlined /> Add
        </Tag>
      )}

    </>
  );

}

EditableTagGroup.propTypes = {
  transaction: PropTypes.shape({
    id: PropTypes.number.isRequired,
    tags: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired
    })).isRequired
  }).isRequired
};

export default EditableTagGroup;