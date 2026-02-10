import { AppShell, Tabs } from "@mantine/core";
import {
  IconBellDollar,
  IconBuildingBank,
  IconCalendarMonth,
  IconCategory,
  IconChartHistogram,
  IconDatabaseSearch,
  IconUpload,
} from "@tabler/icons-react";
import { useLocation, useNavigate } from "react-router";
import AccountsList from "./Accounts/AccountsList";
import CategoriesList from "./Categories/CategoriesList";
import MainContent from "./MainContent";
import UploadsList from "./Uploads/UploadsList";

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarVisible =
    location.pathname.startsWith("/accounts") ||
    location.pathname.startsWith("/categories") ||
    location.pathname.startsWith("/uploads");

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: false, desktop: false },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Tabs
          h="100%"
          value={location.pathname.split("/")[1]}
          onChange={(value) => navigate(`/${value}`)}
        >
          <Tabs.List h="100%">
            <Tabs.Tab
              value="snapshot"
              leftSection={<IconCalendarMonth size={12} />}
            >
              Snapshot
            </Tabs.Tab>
            <Tabs.Tab
              value="trends"
              leftSection={<IconChartHistogram size={12} />}
            >
              Trends
            </Tabs.Tab>
            <Tabs.Tab
              value="explore"
              leftSection={<IconDatabaseSearch size={12} />}
            >
              Explore
            </Tabs.Tab>
            <Tabs.Tab
              value="accounts"
              leftSection={<IconBuildingBank size={12} />}
            >
              Accounts
            </Tabs.Tab>
            <Tabs.Tab
              value="categories"
              leftSection={<IconCategory size={12} />}
            >
              Categories
            </Tabs.Tab>
            <Tabs.Tab value="uploads" leftSection={<IconUpload size={12} />}>
              Uploads
            </Tabs.Tab>
            <Tabs.Tab
              value="budgeting"
              leftSection={<IconBellDollar size={12} />}
            >
              Budgeting
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </AppShell.Header>
      {sidebarVisible && (
        <AppShell.Navbar p="md">
          <div
            style={{
              maxHeight: "calc(100vh - 5rem)",
              height: "100%",
            }}
          >
            {location.pathname.startsWith("/accounts") && <AccountsList />}
            {location.pathname.startsWith("/categories") && <CategoriesList />}
            {location.pathname.startsWith("/uploads") && <UploadsList />}
          </div>
        </AppShell.Navbar>
      )}
      <AppShell.Main bg="dark" pl={!sidebarVisible ? "1rem" : undefined}>
        <MainContent />
      </AppShell.Main>
    </AppShell>
  );
}
