import { Layout as AntdLayout } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sider } from './Sider';

const { Content } = AntdLayout;

const Layout = (): JSX.Element => {
  return (
    <AntdLayout
      style={{
        height: '100%',
      }}
    >
      <Sider />
      <AntdLayout>
        <Header />
        <Content>
          <Outlet />
        </Content>
      </AntdLayout>
    </AntdLayout>
  );
};

export default Layout;
