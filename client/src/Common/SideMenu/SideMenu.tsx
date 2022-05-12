import { BankOutlined, FilterOutlined, TagOutlined } from '@ant-design/icons';
import { Layout, Menu, Spin, Typography } from 'antd';
import { MenuInfo } from 'rc-menu/lib/interface';
import React, { Suspense, useState } from 'react';
import { SidebarAccountsList } from '../../Accounts/SidebarAccountsList';
import { SidebarFiltersList } from '../../Filters/SidebarFiltersList';
import { SidebarTagList } from '../../Tags/SidebarTagList';

const { Title } = Typography;
const { Sider } = Layout;

export const SIDE_MENU_WIDTH = 300;
const ACCOUNTS_KEY = 'Accounts';
const TAGS_KEY = 'Tags';
const FILTERS_KEY = 'Filters';

const SideMenu = (): JSX.Element => {
  const [activePanel, setActivePanel] = useState<React.Key>(ACCOUNTS_KEY);

  const onPanelSelect = ({ key }: MenuInfo) => {
    setActivePanel(key);
  };

  return (
    <Sider width={SIDE_MENU_WIDTH} theme='light'>
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
          }}
        >
          <Title
            level={3}
            style={{
              textAlign: 'center',
              height: '64px',
              lineHeight: '64px',
              verticalAlign: 'middle',
            }}
          >
            {activePanel}
          </Title>
          <Suspense fallback={<Spin />}>
            {activePanel === ACCOUNTS_KEY && <SidebarAccountsList />}
            {activePanel === TAGS_KEY && <SidebarTagList />}
            {activePanel === FILTERS_KEY && <SidebarFiltersList />}
          </Suspense>
        </div>
        <Menu mode='horizontal' theme='dark' onClick={onPanelSelect}>
          <Menu.Item key={ACCOUNTS_KEY} icon={<BankOutlined />} />
          <Menu.Item key={TAGS_KEY} icon={<TagOutlined />} />
          <Menu.Item key={FILTERS_KEY} icon={<FilterOutlined />} />
        </Menu>
      </div>
    </Sider>
  );
};

export default SideMenu;
