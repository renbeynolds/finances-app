import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Select, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestFetchAccountOptions } from '../../Redux/Accounts/actions';
import { clearTransactionUploadIdFilter, removeTransactionTagFilter, setTransactionAccountIdFilter } from '../../Redux/Filters/reducer';
import { selectTransactionAccountIdFilter, selectTransactionTagsFilter, selectTransactionUploadIdFilter } from '../../Redux/Filters/selectors';

const { Option } = Select;

function TransactionFilterCard() {

  const dispatch = useDispatch();

  const uploadId = useSelector(selectTransactionUploadIdFilter);
  const accountId = useSelector(selectTransactionAccountIdFilter);
  const tags = useSelector(selectTransactionTagsFilter);

  const [accountOptions, setAccountOptions] = useState([]);

  useEffect(() => {
    const fetchFiltersOptions = async() => {
      const request = await dispatch(requestFetchAccountOptions());
      setAccountOptions(request.payload);
    };
    fetchFiltersOptions();
  }, [dispatch]);

  const onAccountSelect = (value) => {
    dispatch(setTransactionAccountIdFilter(value));
  };

  return (
    <Card bordered={true} style={{ width: '100%' }}>

      <Select
        style={{ width: 200 }}
        onChange={onAccountSelect}
        value={accountId}
        allowClear
      >
        { accountOptions.map(a => (
          <Option key={a.id} value={a.id}>{a.name}</Option>
        ))}
      </Select>

      { uploadId &&
        <Button
          icon={<CloseOutlined/>}
          onClick={() => dispatch(clearTransactionUploadIdFilter())}
        >Just Uploaded</Button>
      }

      { tags.length > 0 && tags.map((tag, idx) => (
        <Tag
          key={idx}
          closable={true}
          onClose={() => dispatch(removeTransactionTagFilter(tag))}
          color={tag.color}
        >{tag.name}</Tag>
      ))}

    </Card>
  );
}

export default TransactionFilterCard;