import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, DatePicker, Select, Space, Tag } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAccountOptions } from '../../Hooks/useAccountOptions';
import { clearEndDateFilter, clearStartDateFilter, clearUploadIdFilter, removeTagFilter, setAccountIdFilter, setEndDateFilter, setStartDateFilter } from '../../Redux/Filters/reducer';
import { selectAccountIdFilter, selectEndDateFilter, selectStartDateFilter, selectTagsFilter, selectUploadIdFilter } from '../../Redux/Filters/selectors';
import DateRanges from '../../Utils/DateRanges';

const { RangePicker } = DatePicker;
const { Option } = Select;

function TransactionFilterCard() {

  const dispatch = useDispatch();

  const uploadId = useSelector(selectUploadIdFilter);
  const accountId = useSelector(selectAccountIdFilter);
  const startDate = useSelector(selectStartDateFilter);
  const endDate = useSelector(selectEndDateFilter);
  const tags = useSelector(selectTagsFilter);
  const accountOptions = useAccountOptions();

  const onAccountSelect = (value) => {
    dispatch(setAccountIdFilter(value));
  };

  const onDateRangeChange = (dates) => {
    if (dates) {
      dispatch(setStartDateFilter(dates[0]));
      dispatch(setEndDateFilter(dates[1]));
    } else {
      dispatch(clearStartDateFilter());
      dispatch(clearEndDateFilter());
    }
  };

  return (
    <Card bordered={true} style={{ width: '100%' }}>
      <Space direction='horizontal'>

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

        <RangePicker
          defaultValue={[startDate, endDate]}
          ranges={{
              'Last Month': DateRanges.lastMonth(),
              'Last 30 Days': DateRanges.last30Days(),
              'Past Year': DateRanges.last365Days(),
          }}
          onChange={onDateRangeChange}
        />

        { uploadId &&
          <Button
            icon={<CloseOutlined/>}
            onClick={() => dispatch(clearUploadIdFilter())}
          >Just Uploaded</Button>
        }

        { tags.length > 0 && tags.map((tag, idx) => (
          <Tag
            key={idx}
            closable={true}
            onClose={() => dispatch(removeTagFilter(tag))}
            color={tag.color}
          >{tag.name}</Tag>
        ))}

      </Space>
    </Card>
  );
}

export default TransactionFilterCard;