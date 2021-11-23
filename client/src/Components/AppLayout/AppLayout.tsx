import { Layout } from 'antd';
import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { AccountForm } from '../AccountForm';
import { BottomDrawer } from '../BottomDrawer';
// import { SideMenu } from '../SideMenu';
// import { TagForm } from '../TagForm';
// import { UploadTransactionsForm } from '../UploadTransactionsForm';

const { Header, Content } = Layout;

export const ROOT_URL = '/';
export const NEW_ACCOUNT_URL = '/accounts/new';
export const NEW_TAG_URL = '/tags/new';
export const UPLOAD_TRANSACTIONS_URL = (accountId: number | string) =>
  `/accounts/${accountId}/upload`;

const AppLayout = (): JSX.Element => {
  return (
    <Layout
      style={{
        height: '100%',
      }}
    >
      {/* <SideMenu /> */}
      <Layout>
        <Header></Header>
        <Content>
          {/* <Router>
            <Routes>
              <Route path={ROOT_URL} />
              <Route path={NEW_ACCOUNT_URL} element={<AccountForm />} />
              <Route path={NEW_TAG_URL} element={<TagForm />} />
              <Route
                path={UPLOAD_TRANSACTIONS_URL(':accountId')}
                element={
                  <Suspense fallback={<Spin />}>
                    <UploadTransactionsForm />
                  </Suspense>
                }
              />
            </Routes>
          </Router> */}
        </Content>
        <BottomDrawer />
      </Layout>
    </Layout>
  );
};

export default AppLayout;
