import { ActionIcon, TextInput } from '@mantine/core';
import { IconSearch, IconX } from '@tabler/icons-react';
import * as React from 'react';

type TransactionTableDescriptionFilterProps = {
  descriptionFilter: string;
  setDescriptionFilter: (value: string) => void;
  close: () => void;
};

export default function TransactionTableDescriptionFilter({
  descriptionFilter,
  setDescriptionFilter,
  close,
}: TransactionTableDescriptionFilterProps) {
  const [descriptionSearch, setDescriptionSearch] =
    React.useState(descriptionFilter);

  const enterFunction = React.useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        setDescriptionFilter(descriptionSearch);
        close();
      }
    },
    [close, setDescriptionFilter, descriptionSearch],
  );

  React.useEffect(() => {
    document.addEventListener('keypress', enterFunction);
    return () => {
      document.removeEventListener('keypress', enterFunction);
    };
  }, [enterFunction]);

  return (
    <TextInput
      label='Description'
      description='Fuzzy search'
      placeholder='Enter search string...'
      leftSection={<IconSearch size={16} />}
      rightSection={
        <ActionIcon
          size='sm'
          variant='transparent'
          c='dimmed'
          onClick={() => {
            setDescriptionSearch('');
            setDescriptionFilter('');
            close();
          }}
        >
          <IconX size={14} />
        </ActionIcon>
      }
      value={descriptionSearch}
      onBlur={(e) => setDescriptionFilter(e.currentTarget.value)}
      onChange={(e) => setDescriptionSearch(e.currentTarget.value)}
    />
  );
}
