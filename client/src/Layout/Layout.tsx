import { Layout as AntdLayout } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sider } from './Sider';

const { Content } = AntdLayout;

const Layout = (): JSX.Element => {
  const [siderOpen, setSiderOpen] = React.useState<boolean>(false);

  return (
    <AntdLayout
      style={{
        height: '100%',
      }}
    >
      <Sider open={siderOpen} />
      <AntdLayout>
        <Header
          siderOpen={siderOpen}
          onSiderOpen={() => setSiderOpen(true)}
          onSiderClose={() => setSiderOpen(false)}
        />
        <Content
          style={{
            margin: 24,
            overflowY: 'scroll',
          }}
        >
          <Outlet />
        </Content>
      </AntdLayout>
    </AntdLayout>
  );
};

export default Layout;
