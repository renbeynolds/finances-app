import {
  DashboardOutlined,
  LineChartOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import React from 'react';
import { useNavigate } from 'react-router';
import { OVERVIEW_PATH, TRENDS_PATH } from '../../App';

const { Header: AntdHeader } = Layout;

const MENU_ITEMS: ItemType[] = [
  { label: 'Overview', key: OVERVIEW_PATH, icon: <DashboardOutlined /> },
  { label: 'Trends', key: TRENDS_PATH, icon: <LineChartOutlined /> },
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
  const navigate = useNavigate();

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
        onSelect={({ key }) => navigate(key)}
      />
    </AntdHeader>
  );
};

export default Header;
