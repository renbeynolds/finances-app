import { Layout, Space } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route } from 'react-router-dom';
import { requestFetchTags } from '../../Redux/Tags/actions';
import { AccountTable } from '../AccountTable';
import { AccountForm } from '../Forms/AccountForm';
import { TagForm } from '../Forms/TagForm';
import { Overview } from '../Overview';
import { Sidebar } from '../Sidebar';
import { TagTable } from '../TagTable';
import { TransactionFilterCard } from '../TransactionFilterCard';
import { TransactionTable } from '../TransactionTable';
import './styles.scss';

const { Content, Footer } = Layout;

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestFetchTags());
  }, []);

  return (
    <Layout className='App__layout'>
      <Sidebar />
      <Layout>
        <Content className='App__content'>
          <Route exact path='/'><Overview /></Route>
          <Route exact path='/accounts'><AccountTable /></Route>
          <Route exact path='/accounts/create'><AccountForm /></Route>
          <Route exact path='/accounts/edit/:accountId'><AccountForm /></Route>
          <Route exact path='/tags'><TagTable /></Route>
          <Route exact path='/tags/create'><TagForm /></Route>
          <Route exact path='/tags/edit/:tagId'><TagForm /></Route>
          <Route exact path='/transactions'>
            <Space direction='vertical' style={{ width: '100%' }}>
              <TransactionFilterCard />
              <TransactionTable />
            </Space>
          </Route>
        </Content>
        <Footer className='App__footer'>Finances App ©2020 Ben Reynolds</Footer>
      </Layout>
    </Layout>
  );
}

export default App;