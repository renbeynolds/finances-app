import { AppShell, Tabs } from '@mantine/core';
import {
  IconBuildingBank,
  IconCalendarMonth,
  IconCategory,
  IconTrendingUp,
  IconUpload,
} from '@tabler/icons-react';
import { useLocation, useNavigate } from 'react-router';
import AccountsList from './AccountsList';
import CategoriesList from './CategoriesList';
import MainContent from './MainContent';
import UploadsList from './UploadsList';

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarVisible =
    location.pathname.startsWith('/accounts') ||
    location.pathname === '/categories' ||
    location.pathname === '/uploads';

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: false, desktop: false },
      }}
      padding='md'
    >
      <AppShell.Header>
        <Tabs
          h='100%'
          value={location.pathname.split('/')[1]}
          onChange={(value) => navigate(`/${value}`)}
        >
          <Tabs.List h='100%'>
            <Tabs.Tab
              value='snapshot'
              leftSection={<IconCalendarMonth size={12} />}
            >
              Snapshot
            </Tabs.Tab>
            <Tabs.Tab value='trends' leftSection={<IconTrendingUp size={12} />}>
              Trends
            </Tabs.Tab>
            <Tabs.Tab
              value='accounts'
              leftSection={<IconBuildingBank size={12} />}
            >
              Accounts
            </Tabs.Tab>
            <Tabs.Tab
              value='categories'
              leftSection={<IconCategory size={12} />}
            >
              Categories
            </Tabs.Tab>
            <Tabs.Tab value='uploads' leftSection={<IconUpload size={12} />}>
              Uploads
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </AppShell.Header>
      {sidebarVisible && (
        <AppShell.Navbar p='md'>
          <div
            style={{
              maxHeight: 'calc(100vh - 5rem)',
              overflowY: 'auto',
            }}
          >
            {location.pathname.startsWith('/accounts') && <AccountsList />}
            {location.pathname === '/categories' && <CategoriesList />}
            {location.pathname === '/uploads' && <UploadsList />}
          </div>
        </AppShell.Navbar>
      )}
      <AppShell.Main bg='dark' pl={!sidebarVisible ? '1rem' : undefined}>
        <MainContent />
      </AppShell.Main>
    </AppShell>
  );
}
