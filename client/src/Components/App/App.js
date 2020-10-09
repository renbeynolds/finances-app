import { TagsOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React from 'react';
import './styles.scss';

const { Header, Content, Footer, Sider } = Layout;

function App() {
  return (
    <Layout className='App__layout'>
      <Sider className='App__sider'>
        <div className='App__logo' />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<TagsOutlined />}>Tags</Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className='App__header'/>
        <Content className='App__content'>Some Content</Content>
        <Footer className='App__footer'>Finances App ©2020 Ben Reynolds</Footer>
      </Layout>
    </Layout>
  );
}

export default App;