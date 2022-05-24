import {
  DashboardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import React from 'react';

const { Header: AntdHeader } = Layout;

const MENU_ITEMS: ItemType[] = [
  { label: 'Overview', key: 'overview', icon: <DashboardOutlined /> },
];

interface HeaderProps {
  siderOpen: boolean;
  onSiderOpen: () => void;
  onSiderClose: () => void;
}

const Header = ({
  siderOpen,
  onSiderOpen,
  onSiderClose,
}: HeaderProps): JSX.Element => {
  return (
    <AntdHeader style={{ paddingLeft: '25px' }}>
      <div style={{ float: 'left', paddingRight: '25px' }}>
        <Button
          ghost
          icon={siderOpen ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
          style={{ border: 'none' }}
          onClick={siderOpen ? onSiderClose : onSiderOpen}
        />
      </div>
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
