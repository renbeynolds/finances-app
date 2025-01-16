import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { alpha, ThemeProvider } from '@mui/material/styles';
import AppNavbar from './components/AppNavbar';
import SideMenu from './components/SideMenu';
import Snapshot from './components/Snapshot';
import theme from './theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        <AppNavbar />
        <SideMenu />
        {/* Main content */}
        <Box
          component='main'
          sx={(theme) => ({
            marginTop: '84px',
            padding: '32px',
            flexGrow: 1,
            backgroundColor: alpha(theme.palette.background.default, 1),
            overflow: 'auto',
          })}
        >
          <Snapshot />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
