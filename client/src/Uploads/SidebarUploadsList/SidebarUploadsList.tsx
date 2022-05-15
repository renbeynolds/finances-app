import { List, Typography } from 'antd';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { uploadsState } from '../UploadState';

const { Text } = Typography;

const SidebarUploadsList = (): JSX.Element => {
  const uploads = useRecoilValue(uploadsState);

  return (
    <div
      style={{
        minHeight: 0,
        overflowY: 'scroll',
      }}
    >
      <List
        size='small'
        dataSource={uploads}
        renderItem={(upload) => (
          <List.Item>
            <Text>{upload.id}</Text>
          </List.Item>
        )}
      />
    </div>
  );
};

export default SidebarUploadsList;
