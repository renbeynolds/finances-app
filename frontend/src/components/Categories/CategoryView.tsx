import { useParams } from 'react-router';
import TransactionTable from '../TransactionTable';

export default function CategoryView() {
  const { categoryId } = useParams();

  return <TransactionTable categoryId={categoryId} />;
}
