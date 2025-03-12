import { Route, Routes } from 'react-router';
import Snapshot from './Snapshot';
import Trends from './Trends';
import UploadForm from './UploadForm';

export default function MainContent() {
  return (
    <Routes>
      <Route path='/snapshot' element={<Snapshot />} />
      <Route path='/trends' element={<Trends />} />
      <Route path={':accountId'}>
        <Route path='upload' element={<UploadForm />} />
      </Route>
    </Routes>
  );
}
