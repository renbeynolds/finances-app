import { act, render } from '@testing-library/react';
import React, { Suspense } from 'react';
import { RecoilRoot, useRecoilValueLoadable } from 'recoil';
import { accountsQuery } from './AccountsState';

// act and advance jest timers
function flushPromisesAndTimers(): Promise<void> {
  return act(
    () =>
      new Promise((resolve) => {
        setTimeout(resolve, 100);
        jest.runAllTimers();
      })
  );
}

test('Test foo', async () => {
  jest.useFakeTimers();

  const TestComponent: React.FC = () => {
    const accounts = useRecoilValueLoadable(accountsQuery);

    return <div title='ids'>{accounts.contents.title}</div>;
  };

  const mockState = { title: 'test title' };
  // @ts-ignore
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockState),
    })
  );

  const { getByTitle } = render(
    <RecoilRoot>
      <Suspense fallback={<div>loading...</div>}>
        <TestComponent />
      </Suspense>
    </RecoilRoot>
  );
  await flushPromisesAndTimers();

  expect(getByTitle('ids').textContent).toEqual('test title');
});
