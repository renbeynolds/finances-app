import { List, Typography } from 'antd';
import moment from 'moment';
import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { uploadFilter } from '../../Filters/FiltersState';
import { uploadsListState } from '../UploadState';

const { Text } = Typography;

const SidebarUploadsList = (): JSX.Element => {
  const uploads = useRecoilValue(uploadsListState);
  const setUploadFilter = useSetRecoilState(uploadFilter);

  const uploadsWithDate = uploads.map((u) => ({
    ...u,
    createdAt: moment(u.createdAt).format('MMM DD, YYYY HH:mm:ss'),
  }));

  return (
    <div
      style={{
        minHeight: 0,
        overflowY: 'scroll',
      }}
    >
      <List
        size='small'
        dataSource={uploadsWithDate}
        renderItem={(upload) => (
          <List.Item onClick={() => setUploadFilter(upload.id)}>
            <Text>{upload.createdAt}</Text>
            <Text>{upload.accountName}</Text>
          </List.Item>
        )}
      />
    </div>
  );
};

export default SidebarUploadsList;
