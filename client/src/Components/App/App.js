import { Layout } from 'antd';
import React from 'react';
import { Route } from 'react-router-dom';
import { AccountForm } from '../AccountForm';
import { AccountTable } from '../AccountTable';
import { Sidebar } from '../Sidebar';
import { TagForm } from '../TagForm';
import { TagTable } from '../TagTable';
import { TransactionTable } from '../TransactionTable';
import { Welcome } from '../Welcome';
import './styles.scss';

const { Content, Footer } = Layout;

function App() {
  return (
    <Layout className='App__layout'>
      <Sidebar />
      <Layout>
        <Content className='App__content'>
          <Route exact path='/'><Welcome /></Route>
          <Route exact path='/accounts'><AccountTable /></Route>
          <Route exact path='/accounts/create'><AccountForm /></Route>
          <Route exact path='/accounts/edit/:accountId'><AccountForm /></Route>
          <Route exact path='/tags'><TagTable /></Route>
          <Route exact path='/tags/create'><TagForm /></Route>
          <Route exact path='/tags/edit/:tagId'><TagForm /></Route>
          <Route exact path='/transactions'><TransactionTable /></Route>
        </Content>
        <Footer className='App__footer'>Finances App ©2020 Ben Reynolds</Footer>
      </Layout>
    </Layout>
  );
}

export default App;