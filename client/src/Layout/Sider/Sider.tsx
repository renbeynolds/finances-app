import { BankOutlined, TagOutlined } from '@ant-design/icons';
import { makeStyles } from '@material-ui/styles';
import { Layout, Menu } from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import React from 'react';

const { Sider: AntdSider } = Layout;

const SIDER_WIDTH = 300;

const useStyles = makeStyles({
  menu: {
    '& .ant-menu-title-content': {
      display: 'none',
    },
    '& .ant-menu-item:after': {
      left: 0,
      right: 0,
    },
  },
});

const MENU_ITEMS: ItemType[] = [
  { icon: <BankOutlined />, key: 'accounts' },
  { icon: <TagOutlined />, key: 'tags' },
];

interface SiderProps {
  open: boolean;
}

const Sider = ({ open }: SiderProps): JSX.Element => {
  const classes = useStyles();

  return (
    <AntdSider collapsed={!open} width={SIDER_WIDTH} collapsedWidth={0}>
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        <Menu
          items={MENU_ITEMS}
          mode='horizontal'
          theme='light'
          className={classes.menu}
        ></Menu>
      </div>
    </AntdSider>
  );
};

export default Sider;
