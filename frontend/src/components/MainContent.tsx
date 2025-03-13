import { Route, Routes } from 'react-router';
import AccountView from './AccountView';
import Explore from './Explore';
import Snapshot from './Snapshot';
import Trends from './Trends';

export default function MainContent() {
  return (
    <Routes>
      <Route path='/snapshot' element={<Snapshot />} />
      <Route path='/trends' element={<Trends />} />
      <Route path='/explore' element={<Explore />} />
      <Route path='/accounts' element={<div />} />
      <Route path='/accounts/:accountId' element={<AccountView />} />
    </Routes>
  );
}
