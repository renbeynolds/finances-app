import {
  DashboardOutlined,
  LineChartOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { makeStyles } from '@material-ui/styles';
import { Button, Layout, Menu } from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import React from 'react';
import { useNavigate } from 'react-router';

const { Header: AntdHeader } = Layout;

const MENU_ITEMS: ItemType[] = [
  { label: 'Overview', key: 'overview', icon: <DashboardOutlined /> },
  { label: 'Trends', key: 'trends', icon: <LineChartOutlined /> },
];

const useStyles = makeStyles({
  menu: {
    '& .ant-menu-item:after': {
      left: 0,
      right: 0,
    },
  },
});

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
  const classes = useStyles();

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
        mode='horizontal'
        items={MENU_ITEMS}
        defaultSelectedKeys={['overview']}
        onSelect={({ key }) => navigate(key)}
        className={classes.menu}
      />
    </AntdHeader>
  );
};

export default Header;
