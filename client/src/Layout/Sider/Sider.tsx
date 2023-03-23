import { BankOutlined, TagOutlined, UploadOutlined } from '@ant-design/icons';
import { makeStyles } from '@material-ui/styles';
import { Layout, Menu, Typography } from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import React from 'react';
import { SidebarAccountsList } from '../../Accounts/SidebarAccountsList';
import { SidebarCategoryList } from '../../Categories/SidebarCategoryList';
import { SidebarUploadsList } from '../../Uploads/SidebarUploadsList';
import { capitalized } from '../../Utils/StringUtils';

const { Sider: AntdSider } = Layout;

const SIDER_WIDTH = 300;

const useStyles = makeStyles({
  menu: {
    '& .ant-menu-item-icon': {
      position: 'relative',
      left: 21,
    },
    '& .ant-menu-item': {
      padding: 0,
      width: 56,
    },
    '& .ant-menu-item::after': {
      insetInline: '0px !important',
    },
  },
});

const MENU_ITEMS: ItemType[] = [
  { icon: <BankOutlined />, key: 'accounts' },
  { icon: <TagOutlined />, key: 'categories' },
  { icon: <UploadOutlined />, key: 'uploads' },
];

interface SiderProps {
  open: boolean;
}

const Sider = ({ open }: SiderProps): JSX.Element => {
  const classes = useStyles();
  const [activeKey, setActiveKey] = React.useState<string>('accounts');

  return (
    <AntdSider collapsed={!open} width={SIDER_WIDTH} collapsedWidth={0}>
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Typography.Title level={2} style={{ lineHeight: '64px' }}>
            {capitalized(activeKey)}
          </Typography.Title>
        </div>
        {activeKey === 'accounts' && <SidebarAccountsList />}
        {activeKey === 'categories' && <SidebarCategoryList />}
        {activeKey === 'uploads' && <SidebarUploadsList />}
        <div style={{ flexGrow: 1 }} />
        <Menu
          items={MENU_ITEMS}
          mode='horizontal'
          className={classes.menu}
          selectedKeys={[activeKey]}
          onSelect={({ key }) => setActiveKey(key)}
        ></Menu>
      </div>
    </AntdSider>
  );
};

export default Sider;
