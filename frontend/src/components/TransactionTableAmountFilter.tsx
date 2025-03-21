import { Button, NumberInput, Stack } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import * as React from 'react';
import { TransactionFiltersAction } from '../context/TransactionFiltersContext';

type TransactionTableAmountFilterProps = {
  amountFilter: [number | undefined, number | undefined];
  dispatchTransactionFilters: React.Dispatch<TransactionFiltersAction> | null;
  close: () => void;
};

export default function TransactionTableAmountFilter({
  amountFilter,
  dispatchTransactionFilters,
  close,
}: TransactionTableAmountFilterProps) {
  const [amountValues, setAmountValues] =
    React.useState<[number | undefined, number | undefined]>(amountFilter);

  const enterFunction = React.useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Enter' && dispatchTransactionFilters) {
        dispatchTransactionFilters({
          type: 'SET_AMOUNT_FILTER',
          payload: amountValues,
        });
        close();
      }
    },
    [close, dispatchTransactionFilters, amountValues],
  );

  React.useEffect(() => {
    document.addEventListener('keypress', enterFunction);
    return () => {
      document.removeEventListener('keypress', enterFunction);
    };
  }, [enterFunction]);

  return (
    <Stack>
      <NumberInput
        label='Min'
        prefix='$'
        allowDecimal={false}
        placeholder='$0'
        value={amountValues[0]}
        onChange={(value) => {
          const newFilterValue = value === '' ? undefined : Number(value);
          setAmountValues([newFilterValue, amountValues[1]]);
        }}
        onBlur={() => {
          dispatchTransactionFilters!({
            type: 'SET_AMOUNT_FILTER',
            payload: amountValues,
          });
        }}
      />
      <NumberInput
        label='Max'
        prefix='$'
        allowDecimal={false}
        placeholder='$0'
        value={amountValues[1]}
        onChange={(value) => {
          const newFilterValue = value === '' ? undefined : Number(value);
          setAmountValues([amountValues[0], newFilterValue]);
        }}
        onBlur={() => {
          dispatchTransactionFilters!({
            type: 'SET_AMOUNT_FILTER',
            payload: amountValues,
          });
        }}
      />
      <Button
        variant='light'
        leftSection={<IconX size={14} />}
        onClick={() => {
          dispatchTransactionFilters!({
            type: 'SET_AMOUNT_FILTER',
            payload: [undefined, undefined],
          });
          close();
        }}
      >
        Clear
      </Button>
    </Stack>
  );
}
