import { Spin } from 'antd';
import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { AccountForm } from './Components/AccountForm';
import { AppLayout } from './Components/AppLayout';
import { TagForm } from './Components/TagForm';
import { TransactionTable } from './Components/TransactionTable';
import { UploadTransactionsForm } from './Components/UploadTransactionsForm';

export const ROOT_URL = '/';

const App = (): JSX.Element => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path={ROOT_URL} element={<AppLayout />}>
            <Route index element={<TransactionTable />} />
            <Route path={'accounts'}>
              <Route path={'new'} element={<AccountForm />} />
              <Route path={':accountId'}>
                <Route
                  path={'upload'}
                  element={
                    <Suspense fallback={<Spin />}>
                      <UploadTransactionsForm />
                    </Suspense>
                  }
                />
              </Route>
            </Route>
            <Route path={'tags'}>
              <Route path={'new'} element={<TagForm />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;
