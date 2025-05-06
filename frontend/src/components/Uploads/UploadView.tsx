import { useParams } from 'react-router';
import TransactionTable from '../TransactionTable';

export default function UploadView() {
  const { uploadId } = useParams();

  return <TransactionTable uploadId={uploadId} ignoreDateRange />;
}
