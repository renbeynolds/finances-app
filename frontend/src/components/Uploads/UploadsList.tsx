import { NavLink, Stack } from '@mantine/core';
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
            <NavLink
              key={index}
              active={location.pathname === `/uploads/${upload.id}`}
              onClick={() => navigate(`/uploads/${upload.id}`)}
              label={upload.id}
              description={upload.createdAt}
            />
          ))}
      </Stack>
    </div>
  );
}
