import { AppShell, Group } from '@mantine/core';
import React from 'react';
import AccountsList from './AccountsList';
import SideMenuContentSelector from './SideMenuContentSelector';
import Snapshot from './Snapshot';

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
      <AppShell.Navbar p='md' bg='dark'>
        <SideMenuContentSelector
          selectedContent={selectedContent}
          setSelectedContent={setSelectedContent}
        />
        <AccountsList />
      </AppShell.Navbar>
      <AppShell.Main>
        <Snapshot />
      </AppShell.Main>
    </AppShell>
  );
}
