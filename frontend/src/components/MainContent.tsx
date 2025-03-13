import { Route, Routes } from 'react-router';
import AccountView from './AccountView';
import Snapshot from './Snapshot';
import Trends from './Trends';

export default function MainContent() {
  return (
    <Routes>
      <Route path='/snapshot' element={<Snapshot />} />
      <Route path='/trends' element={<Trends />} />
      <Route path='/accounts/:accountId' element={<AccountView />} />
    </Routes>
  );
}
