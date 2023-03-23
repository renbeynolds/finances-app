import { ConfigProvider, Spin, theme } from 'antd';
import React, { Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { AccountForm } from './Accounts/AccountForm';
import { AccountInsights } from './Accounts/AccountInsights';
import { CategoryForm } from './Categories/CategoryForm';
import { CategoryInsights } from './Categories/CategoryInsights';
import { Layout } from './Layout';
import { Snapshot } from './Snapshot';
import { Trends } from './Trends';
import { UploadForm } from './Uploads/UploadForm';
import { UploadViewer } from './Uploads/UploadViewer';

export const ROOT_URL = '/';

const App = (): JSX.Element => {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path={ROOT_URL} element={<Layout />}>
              <Route index element={<Navigate to={'snapshot'} />} />
              <Route path={'snapshot'} element={<Snapshot />} />
              <Route path={'trends'} element={<Trends />} />
              <Route path={'accounts'}>
                <Route path={'new'} element={<AccountForm />} />
                <Route path={':accountId'} element={<AccountInsights />} />
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
              <Route path={'categories'}>
                <Route
                  path={'new'}
                  element={<CategoryForm intent='create' />}
                />
                <Route path={':categoryId'} element={<CategoryInsights />} />
                <Route
                  path={':categoryId/edit'}
                  element={<CategoryForm intent='edit' />}
                />
              </Route>
              <Route path={'uploads'}>
                <Route path={':uploadId'} element={<UploadViewer />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </ConfigProvider>
  );
};

export default App;
