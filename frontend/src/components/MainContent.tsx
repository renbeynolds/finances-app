import { Route, Routes } from 'react-router';
import Snapshot from './Snapshot';
import UploadForm from './UploadForm';

export default function MainContent() {
  return (
    <Routes>
      <Route path='/' element={<Snapshot />} />
      <Route path={':accountId'}>
        <Route path='upload' element={<UploadForm />} />
      </Route>
    </Routes>
  );
}
