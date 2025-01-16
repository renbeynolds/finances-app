import CameraIcon from '@mui/icons-material/Camera';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import MuiToolbar from '@mui/material/Toolbar';
import { drawerWidth } from './SideMenu';

const Toolbar = styled(MuiToolbar)({
  marginLeft: drawerWidth,
  marginTop: '4px',
  height: '80px',
});

const pages = [
  { name: 'Snapshot', icon: <CameraIcon /> },
  { name: 'Trends', icon: <TrendingUpIcon /> },
];

export default function AppNavbar() {
  return (
    <AppBar
      position='fixed'
      sx={{
        boxShadow: 0,
        bgcolor: 'background.paper',
        backgroundImage: 'none',
        borderBottom: '1px solid',
        borderColor: 'divider',
        top: 'var(--template-frame-height, 0px)',
      }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', gap: '12px' }}>
          {pages.map((page) => (
            <Button
              key={page.name}
              sx={{ my: 2, color: 'white' }}
              startIcon={page.icon}
            >
              {page.name}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
