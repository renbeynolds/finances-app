import { Layout } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { BottomDrawer } from '../BottomDrawer';
import { SideMenu } from '../SideMenu';

const { Content } = Layout;

const AppLayout = (): JSX.Element => {
  return (
    <Layout
      style={{
        height: '100%',
      }}
    >
      <SideMenu />
      <Layout>
        <Content>
          <Outlet />
        </Content>
        <BottomDrawer />
      </Layout>
    </Layout>
  );
};

export default AppLayout;
