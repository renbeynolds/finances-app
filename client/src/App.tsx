import { Spin } from 'antd';
import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { AccountForm } from './Accounts/AccountForm';
import IncomeVsExpense from './Charts/IncomeVsExpense/IndexVsExpense';
import { AppLayout } from './Common/AppLayout';
import { TagForm } from './Tags/TagForm';
import { UploadForm } from './Uploads/UploadForm';

export const ROOT_URL = '/';

const App = (): JSX.Element => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path={ROOT_URL} element={<AppLayout />}>
            <Route
              index
              element={
                <Suspense fallback={<Spin />}>
                  <IncomeVsExpense />
                </Suspense>
              }
            />
            <Route path={'accounts'}>
              <Route path={'new'} element={<AccountForm />} />
              <Route path={':accountId'}>
                <Route
                  path={'upload'}
                  element={
                    <Suspense fallback={<Spin />}>
                      <UploadForm />
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
