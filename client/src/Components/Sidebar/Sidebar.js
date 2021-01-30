import { BankOutlined, DollarOutlined, LineChartOutlined, SyncOutlined, TagsOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const { Sider } = Layout;

function Sidebar() {

    const [collapsed, setCollapsed] = useState(false);
    const pathname = useLocation().pathname;
    const history = useHistory();

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
            <Menu
                theme='dark'
                selectedKeys={[pathname]}
                mode='inline'
            >
                <Menu.Item
                    key='/'
                    icon={<LineChartOutlined/>}
                    onClick={() => history.push('/')}
                >
                    Overview
                </Menu.Item>
                <Menu.Item
                    key='/accounts'
                    icon={<BankOutlined />}
                    onClick={() => history.push('/accounts')}
                >
                    Accounts
                </Menu.Item>
                <Menu.Item
                    key='/tags'
                    icon={<TagsOutlined />}
                    onClick={() => history.push('/tags')}
                >
                    Tags
                </Menu.Item>
                <Menu.Item
                    key='/transactions'
                    icon={<DollarOutlined />}
                    onClick={() => history.push('/transactions')}
                >
                    Transactions
                </Menu.Item>
                <Menu.Item
                    key='/recurring'
                    icon={<SyncOutlined />}
                    onClick={() => history.push('/recurring')}
                >
                    Recurring
                </Menu.Item>
            </Menu>
        </Sider>
    )

}

export default Sidebar;