import { ActionIcon, TextInput } from '@mantine/core';
import { IconSearch, IconX } from '@tabler/icons-react';
import * as React from 'react';
import { TransactionFiltersAction } from '../context/TransactionFiltersContext';

type TransactionTableCommentFilterProps = {
  commentFilter: string;
  dispatchTransactionFilters: React.Dispatch<TransactionFiltersAction> | null;
  close: () => void;
};

export default function TransactionTableCommentFilter({
  commentFilter,
  dispatchTransactionFilters,
  close,
}: TransactionTableCommentFilterProps) {
  const [commentSearch, setCommentSearch] = React.useState(commentFilter);

  const enterFunction = React.useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Enter' && dispatchTransactionFilters) {
        dispatchTransactionFilters({
          type: 'SET_COMMENT_FILTER',
          payload: commentSearch,
        });
        close();
      }
    },
    [close, dispatchTransactionFilters, commentSearch],
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
            dispatchTransactionFilters!({
              type: 'SET_COMMENT_FILTER',
              payload: '',
            });
            close();
          }}
        >
          <IconX size={14} />
        </ActionIcon>
      }
      value={commentSearch}
      onBlur={() => {
        dispatchTransactionFilters!({
          type: 'SET_COMMENT_FILTER',
          payload: commentSearch,
        });
      }}
      onChange={(e) => setCommentSearch(e.currentTarget.value)}
    />
  );
}
