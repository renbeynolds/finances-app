import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Tag } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearTransactionUploadIdFilter, removeTransactionTagFilter } from '../../Redux/Filters/reducer';
import { selectTransactionTagsFilter, selectTransactionUploadIdFilter } from '../../Redux/Filters/selectors';

function TransactionFilterCard() {

    const dispatch = useDispatch();
    const uploadId = useSelector(selectTransactionUploadIdFilter);
    const tags = useSelector(selectTransactionTagsFilter);

    return (
        <Card bordered={true} style={{width: '100%'}}>
            { uploadId &&
                <Button
                    icon={<CloseOutlined/>}
                    onClick={() => dispatch(clearTransactionUploadIdFilter())}
                >Just Uploaded</Button>
            }

            { tags.length > 0 && tags.map(tag => (
                <Tag
                    closable={true}
                    onClose={() => dispatch(removeTransactionTagFilter(tag))}
                    color={tag.color}
                >{tag.name}</Tag>
            ))}
        </Card>
    );
};

export default TransactionFilterCard;