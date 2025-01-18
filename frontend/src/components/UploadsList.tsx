import { Button, Stack, Text } from '@mantine/core';
import { IconUpload } from '@tabler/icons-react';
import useSWR from 'swr';
import { UploadsEndpoint, UploadsFetcher } from '../Fetchers';

export default function UploadsList() {
  const { data, error, isLoading } = useSWR(UploadsEndpoint, UploadsFetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <Stack align='stretch' justify='flex-start' gap='md'>
      {data!.data.map((upload, index) => (
        <Button
          key={index}
          variant='outline'
          h='3rem'
          justify='space-between'
          rightSection={<IconUpload size={14} />}
        >
          <Stack gap='0'>
            <Text size='l' c='white'>
              {upload.id}
            </Text>
          </Stack>
        </Button>
      ))}
    </Stack>
  );
}
