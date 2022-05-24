import { DashboardOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import React from 'react';

const { Header: AntdHeader } = Layout;

const MENU_ITEMS: ItemType[] = [
  { label: 'Overview', key: 'overview', icon: <DashboardOutlined /> },
];

const Header = (): JSX.Element => {
  return (
    <AntdHeader style={{ paddingLeft: 0 }}>
      <Menu
        theme='dark'
        mode='horizontal'
        items={MENU_ITEMS}
        defaultSelectedKeys={['overview']}
      />
    </AntdHeader>
  );
};

export default Header;
