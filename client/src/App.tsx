import { Space, Spin } from 'antd';
import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { IncomeVsExpense } from './Charts/IncomeVsExpense';
import { TagSpendingOverTime } from './Charts/TagSpendingOverTime';
import { TopSpendingTags } from './Charts/TopSpendingTags';
import { FilterDependencyEffect } from './Filters/FilterDependecyEffect';
import { Layout } from './Layout';

export const ROOT_URL = '/';

const App = (): JSX.Element => {
  return (
    <RecoilRoot>
      <FilterDependencyEffect />
      <BrowserRouter>
        <Routes>
          <Route path={ROOT_URL} element={<Layout />}>
            <Route
              index
              element={
                <Space direction='vertical' size='large'>
                  <Space direction='horizontal' size='large'>
                    <Suspense fallback={<Spin />}>
                      <IncomeVsExpense />
                    </Suspense>
                    <Suspense fallback={<Spin />}>
                      <TopSpendingTags />
                    </Suspense>
                  </Space>
                  <Space direction='horizontal' size='large'>
                    <Suspense fallback={<Spin />}>
                      <TagSpendingOverTime />
                    </Suspense>
                  </Space>
                </Space>
              }
            />
            {/* <Route path={'accounts'}>
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
