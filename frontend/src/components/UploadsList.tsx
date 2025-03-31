import { Button, Stack, Text } from '@mantine/core';
import useSWR from 'swr';
import { UploadsEndpoint, UploadsFetcher } from '../Fetchers';

export default function UploadsList() {
  const { data, error, isLoading } = useSWR(UploadsEndpoint, UploadsFetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div
      style={{
        height: '100%',
        overflowY: 'auto',
      }}
    >
      <Stack align='stretch' justify='flex-start' gap='md'>
        {data!.data.map((upload, index) => (
          <Button
            key={index}
            variant='outline'
            h='3rem'
            justify='space-between'
          >
            <Stack gap='0'>
              <Text size='l'>{upload.id}</Text>
            </Stack>
          </Button>
        ))}
      </Stack>
    </div>
  );
}
