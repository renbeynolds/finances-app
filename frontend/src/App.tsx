import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import 'mantine-datatable/styles.layer.css';
import Layout from './components/Layout';

export default function App() {
  return (
    <MantineProvider defaultColorScheme='dark'>
      <Layout />
    </MantineProvider>
  );
}
