import { Button, Stack, Text } from '@mantine/core';
import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import useSWR from 'swr';
import { UploadsEndpoint, UploadsFetcher } from '../../Fetchers';

export default function UploadsList() {
  const { data, error, isLoading } = useSWR(UploadsEndpoint, UploadsFetcher);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname === '/uploads' && data?.data.length) {
      navigate(`/uploads/${data.data[0].id}`);
    }
  }, [data, navigate, location.pathname]);

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
        {data!.data
          .sort((a, b) => b.id - a.id)
          .map((upload, index) => (
            <Button
              key={index}
              variant='outline'
              h='3rem'
              justify='space-between'
              onClick={() => {
                navigate(`/uploads/${upload.id}`);
              }}
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
