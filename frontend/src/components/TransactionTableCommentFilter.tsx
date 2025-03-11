import { ActionIcon, TextInput } from '@mantine/core';
import { IconSearch, IconX } from '@tabler/icons-react';
import * as React from 'react';

type TransactionTableCommentFilterProps = {
  commentFilter: string;
  setCommentFilter: (value: string) => void;
  close: () => void;
};

export default function TransactionTableCommentFilter({
  commentFilter,
  setCommentFilter,
  close,
}: TransactionTableCommentFilterProps) {
  const [commentSearch, setCommentSearch] = React.useState(commentFilter);

  const enterFunction = React.useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        setCommentFilter(commentSearch);
        close();
      }
    },
    [close, setCommentFilter, commentSearch],
  );

  React.useEffect(() => {
    document.addEventListener('keypress', enterFunction);
    return () => {
      document.removeEventListener('keypress', enterFunction);
    };
  }, [enterFunction]);

  return (
    <TextInput
      label='Comment'
      description='Fuzzy search'
      placeholder='Enter search string...'
      leftSection={<IconSearch size={16} />}
      rightSection={
        <ActionIcon
          size='sm'
          variant='transparent'
          c='dimmed'
          onClick={() => {
            setCommentFilter('');
            close();
          }}
        >
          <IconX size={14} />
        </ActionIcon>
      }
      value={commentSearch}
      onBlur={() => setCommentFilter(commentSearch)}
      onChange={(e) => setCommentSearch(e.currentTarget.value)}
    />
  );
}
