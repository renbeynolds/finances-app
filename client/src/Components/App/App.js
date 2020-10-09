import { BankOutlined, TagsOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { AccountList } from '../AccountList';
import CreateAccountForm from '../CreateAccountForm/CreateAccountForm';
import { TagList } from '../TagList';
import { Welcome } from '../Welcome';
import './styles.scss';

const { Header, Content, Footer, Sider } = Layout;

function App() {

  const history = useHistory();

  return (
    <Layout className='App__layout'>
      <Sider className='App__sider'>
        <div className='App__logo' />
        <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
          <Menu.Item key='1' icon={<BankOutlined />} onClick={() => history.push('/accounts')}>Accounts</Menu.Item>
          <Menu.Item key='2' icon={<TagsOutlined />} onClick={() => history.push('/tags')}>Tags</Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className='App__header'/>
        <Content className='App__content'>
          <Route exact path='/'><Welcome /></Route>
          <Route exact path='/accounts'><AccountList /></Route>
          <Route exact path='/accounts/create'><CreateAccountForm /></Route>
          <Route exact path='/tags'><TagList /></Route>
        </Content>
        <Footer className='App__footer'>Finances App ©2020 Ben Reynolds</Footer>
      </Layout>
    </Layout>
  );
}

export default App;