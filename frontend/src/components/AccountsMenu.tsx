import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import currency from 'currency.js';
import useSWR from 'swr';
import fetcher from '../fetcher';

export default function MenuContent() {
  const { data, error, isLoading } = useSWR('/api/accounts', fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <List dense>
      {data.data.map((account, index) => (
        <ListItem key={index} disablePadding sx={{ display: 'block' }}>
          <ListItemButton selected={index === 0}>
            <ListItemText
              slotProps={{
                secondary: {
                  sx: {
                    color: account.balance > 0 ? 'success.main' : 'error.main',
                  },
                },
              }}
              primary={account.name}
              secondary={currency(account.balance, {
                fromCents: true,
              }).format()}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
