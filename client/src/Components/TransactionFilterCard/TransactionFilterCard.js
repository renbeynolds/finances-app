import { CloseOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearTransactionUploadFilter } from '../../Redux/Filters/reducer';
import { selectTransactionUploadFilter } from '../../Redux/Filters/selectors';

function TransactionFilterCard() {

    const dispatch = useDispatch();
    const uploadFilter = useSelector(selectTransactionUploadFilter);

    return (
        <Card bordered={true} style={{width: '100%'}}>
            { uploadFilter &&
                <Button
                    icon={<CloseOutlined/>}
                    onClick={() => dispatch(clearTransactionUploadFilter())}
                >Just Uploaded</Button>
            }
        </Card>
    );
};

export default TransactionFilterCard;