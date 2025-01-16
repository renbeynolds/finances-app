import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CategoryIcon from '@mui/icons-material/Category';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import MuiAvatar from '@mui/material/Avatar';
import MuiListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent, selectClasses } from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import * as React from 'react';

const Avatar = styled(MuiAvatar)(({ theme }) => ({
  width: 28,
  height: 28,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.secondary,
  border: `1px solid ${theme.palette.divider}`,
}));

const ListItemAvatar = styled(MuiListItemAvatar)({
  minWidth: 0,
  marginRight: 12,
});

interface SideMenuContentSelectorProps {
  selectedContent: string;
  setSelectedContent: React.Dispatch<React.SetStateAction<string>>;
}

export default function SideMenuContentSelector({
  selectedContent,
  setSelectedContent,
}: SideMenuContentSelectorProps) {
  const handleChange = (event: SelectChangeEvent) => {
    setSelectedContent(event.target.value as string);
  };

  return (
    <Select
      labelId='content-select'
      id='content-simple-select'
      value={selectedContent}
      onChange={handleChange}
      displayEmpty
      inputProps={{ 'aria-label': 'Select Content' }}
      fullWidth
      sx={{
        maxHeight: 56,
        width: 215,
        '&.MuiList-root': {
          p: '8px',
        },
        [`& .${selectClasses.select}`]: {
          display: 'flex',
          alignItems: 'center',
          gap: '2px',
          pl: 1,
        },
      }}
    >
      <MenuItem value='accounts'>
        <ListItemAvatar>
          <Avatar alt='Accounts'>
            <AccountBalanceIcon sx={{ fontSize: '1rem' }} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary='Accounts' />
      </MenuItem>
      <MenuItem value='categories'>
        <ListItemAvatar>
          <Avatar alt='Categories'>
            <CategoryIcon sx={{ fontSize: '1rem' }} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary='Categories' />
      </MenuItem>
      <MenuItem value='uploads'>
        <ListItemAvatar>
          <Avatar alt='Uploads'>
            <UploadFileIcon sx={{ fontSize: '1rem' }} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary='Uploads' />
      </MenuItem>
    </Select>
  );
}
