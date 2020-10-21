import { BankOutlined, DollarOutlined, TagsOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React from 'react';
import { Route, useHistory, useLocation } from 'react-router-dom';
import { AccountTable } from '../AccountTable';
import { CreateAccountForm } from '../CreateAccountForm';
import { SpendingOverTimeChart } from '../SpendingOverTimeChart';
import { TagForm } from '../TagForm';
import { TagTable } from '../TagTable';
import { TransactionTable } from '../TransactionTable';
import { Welcome } from '../Welcome';
import './styles.scss';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function App() {

  const history = useHistory();
  const pathname = useLocation().pathname;

  return (
    <Layout className='App__layout'>
      <Menu
        theme='dark' mode='horizontal'
        selectedKeys={[pathname]}
      >
        <Menu.Item key='/accounts' icon={<BankOutlined />} onClick={() => history.push('/accounts')}>Accounts</Menu.Item>
        <Menu.Item key='/tags' icon={<TagsOutlined />} onClick={() => history.push('/tags')}>Tags</Menu.Item>
        <SubMenu key='/trasactions' icon={<DollarOutlined />} title='Transactions'>
          <Menu.Item key='/transactions/table' onClick={() => history.push('/transactions/table')}>Table</Menu.Item>
          <Menu.Item key='/transactions/charts' onClick={() => history.push('/transactions/charts')}>Charts</Menu.Item>
        </SubMenu>
      </Menu>
      <Layout>
        <Content className='App__content'>
          <Route exact path='/'><Welcome /></Route>
          <Route exact path='/accounts'><AccountTable /></Route>
          <Route exact path='/accounts/create'><CreateAccountForm /></Route>
          <Route exact path='/tags'><TagTable /></Route>
          <Route exact path='/tags/create'><TagForm /></Route>
          <Route exact path='/tags/edit/:tagId'><TagForm /></Route>
          <Route exact path='/transactions/table'><TransactionTable /></Route>
          <Route exact path='/transactions/charts'><SpendingOverTimeChart /></Route>
        </Content>
        <Footer className='App__footer'>Finances App ©2020 Ben Reynolds</Footer>
      </Layout>
    </Layout>
  );
}

export default App;