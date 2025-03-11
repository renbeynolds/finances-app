import { Button, NumberInput, Stack } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import * as React from 'react';

type TransactionTableAmountFilterProps = {
  amountFilter: [number | undefined, number | undefined];
  setAmountFilter: (value: [number | undefined, number | undefined]) => void;
  close: () => void;
};

export default function TransactionTableAmountFilter({
  amountFilter,
  setAmountFilter,
  close,
}: TransactionTableAmountFilterProps) {
  const [amountValues, setAmountValues] =
    React.useState<[number | undefined, number | undefined]>(amountFilter);

  const enterFunction = React.useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        setAmountFilter(amountValues);
        close();
      }
    },
    [close, setAmountFilter, amountValues],
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
          setAmountFilter(amountValues);
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
          setAmountFilter(amountValues);
        }}
      />
      <Button
        variant='light'
        leftSection={<IconX size={14} />}
        onClick={() => {
          setAmountFilter([undefined, undefined]);
          close();
        }}
      >
        Clear
      </Button>
    </Stack>
  );
}
