import { BankOutlined, TagOutlined } from '@ant-design/icons';
import { Layout, Menu, Spin, Typography } from 'antd';
import { MenuInfo } from 'rc-menu/lib/interface';
import React, { Suspense, useState } from 'react';
import AccountsList from './AccountsList';
import TagsList from './TagsList';

const { Title } = Typography;
const { Sider } = Layout;

export const SIDE_MENU_WIDTH = 300;
const ACCOUNTS_KEY = 'Accounts';
const TAGS_KEY = 'Tags';

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
        <div>
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
            {activePanel === ACCOUNTS_KEY && <AccountsList />}
            {activePanel === TAGS_KEY && <TagsList />}
          </Suspense>
        </div>
        <Menu mode='horizontal' theme='dark' onClick={onPanelSelect}>
          <Menu.Item key={ACCOUNTS_KEY} icon={<BankOutlined />} />
          <Menu.Item key={TAGS_KEY} icon={<TagOutlined />} />
        </Menu>
      </div>
    </Sider>
  );
};

export default SideMenu;
