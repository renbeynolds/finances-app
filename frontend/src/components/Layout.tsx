import { AppShell, Group } from '@mantine/core';
import React from 'react';
import AccountsList from './AccountsList';
import CategoriesList from './CategoriesList';
import MainContent from './MainContent';
import SideMenuContentSelector from './SideMenuContentSelector';
import UploadsList from './UploadsList';

export default function Layout() {
  const [selectedContent, setSelectedContent] =
    React.useState<string>('accounts');

  return (
    <AppShell
      layout='alt'
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: false, desktop: false },
      }}
      padding='md'
    >
      <AppShell.Header>
        <Group h='100%' px='md'>
          {/* Page Selection */}
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p='md'>
        <SideMenuContentSelector
          selectedContent={selectedContent}
          setSelectedContent={setSelectedContent}
        />
        <div
          style={{
            maxHeight: 'calc(100vh - 5rem)',
            overflowY: 'auto',
            marginTop: '1rem',
          }}
        >
          {selectedContent === 'accounts' && <AccountsList />}
          {selectedContent === 'categories' && <CategoriesList />}
          {selectedContent === 'uploads' && <UploadsList />}
        </div>
      </AppShell.Navbar>
      <AppShell.Main bg='dark'>
        <MainContent />
      </AppShell.Main>
    </AppShell>
  );
}
