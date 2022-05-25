import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { AccountForm } from './Accounts/AccountForm';
import { FilterDependencyEffect } from './Filters/FilterDependecyEffect';
import { Layout } from './Layout';
import { Overview } from './Overview';
import { Trends } from './Trends';

export const ROOT_URL = '/';

const App = (): JSX.Element => {
  return (
    <RecoilRoot>
      <FilterDependencyEffect />
      <BrowserRouter>
        <Routes>
          <Route path={ROOT_URL} element={<Layout />}>
            <Route index element={<Navigate to={'overview'} />} />
            <Route path={'overview'} element={<Overview />} />
            <Route path={'trends'} element={<Trends />} />
            <Route path={'accounts'}>
              <Route path={'new'} element={<AccountForm />} />
              {/* <Route path={':accountId'}>
                <Route
                  path={'upload'}
                  element={
                    <Suspense fallback={<Spin />}>
                      <UploadForm />
                    </Suspense>
                  }
                />
              </Route> */}
            </Route>
            {/* <Route path={'tags'}>
              <Route path={'new'} element={<TagForm intent='create' />} />
              <Route path={':tagId'} element={<TagForm intent='edit' />} />
            </Route> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;
