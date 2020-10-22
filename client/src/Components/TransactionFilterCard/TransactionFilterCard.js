import { CloseOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearTransactionUploadIdFilter } from '../../Redux/Filters/reducer';
import { selectTransactionUploadIdFilter } from '../../Redux/Filters/selectors';

function TransactionFilterCard() {

    const dispatch = useDispatch();
    const uploadIdFilter = useSelector(selectTransactionUploadIdFilter);

    return (
        <Card bordered={true} style={{width: '100%'}}>
            { uploadIdFilter &&
                <Button
                    icon={<CloseOutlined/>}
                    onClick={() => dispatch(clearTransactionUploadIdFilter())}
                >Just Uploaded</Button>
            }
        </Card>
    );
};

export default TransactionFilterCard;