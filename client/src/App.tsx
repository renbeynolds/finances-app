import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { FilterDependencyEffect } from './Filters/FilterDependecyEffect';
import { Layout } from './Layout';
import { Overview } from './Overview';

export const ROOT_URL = '/';

const App = (): JSX.Element => {
  return (
    <RecoilRoot>
      <FilterDependencyEffect />
      <BrowserRouter>
        <Routes>
          <Route path={ROOT_URL} element={<Layout />}>
            <Route index element={<Overview />} />
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
