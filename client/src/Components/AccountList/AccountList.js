import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, List, Typography } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { requestFetchAccounts } from '../../Redux/Accounts/actions';
import { selectAccountsArray } from '../../Redux/Accounts/selectors';

function AccountList() {

    const dispatch = useDispatch();
    const history = useHistory();
    const accounts = useSelector(selectAccountsArray);

    useEffect(() => {
        dispatch(requestFetchAccounts());
    }, [dispatch]);

    return (
        <List
            header={
                <Button
                    type="primary" shape="round" 
                    icon={<PlusCircleOutlined />} size='default'
                    onClick={() => history.push('/accounts/create')}
                >Add Account</Button>
            }
            bordered
            dataSource={accounts}
            renderItem={item => (
                <List.Item>
                    <Typography.Text mark>[ITEM]</Typography.Text> {item.name}
                </List.Item>
            )}
        />
    );
};

export default AccountList;