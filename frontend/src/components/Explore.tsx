// import React from 'react';
// import useSWR from 'swr';
// import { DateFilterContext } from '../context/DateFilterContext';
// import { AmountFetcher, FilteredTransactionsTotalEndpoint } from '../Fetchers';
import TransactionTable from './TransactionTable';

export default function Explore() {
  // const dateFilter = React.useContext(DateFilterContext);

  // const { data, error, isLoading, mutate } = useSWR(
  //   `${FilteredTransactionsTotalEndpoint}?` +
  //     `&from=${dateFilter[0]}&to=${dateFilter[1]}` +
  //     `&description=${descriptionFilter}` +
  //     `&min=${amountFilter[0] !== undefined ? amountFilter[0] : ''}&max=${amountFilter[1] !== undefined ? amountFilter[1] : ''}` +
  //     `&comment=${commentFilter}` +
  //     `&account_id=`,
  //   AmountFetcher,
  // );

  // React.useEffect(() => {
  //   console.log('mutate');
  //   mutate();
  // }, [
  //   mutate,
  //   // accountId,
  //   descriptionFilter,
  //   dateFilter,
  //   amountFilter,
  //   commentFilter,
  // ]);

  // console.log(data);

  return <TransactionTable />;
}
