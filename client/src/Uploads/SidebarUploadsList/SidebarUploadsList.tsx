import { makeStyles } from '@material-ui/styles';
import { List, Typography } from 'antd';
import cx from 'classnames';
import dayjs from 'dayjs';
import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useRecoilValueLoadable } from 'recoil';
import { UploadListItem, uploadsListState } from '../UploadState';

const { Text } = Typography;

const useStyles = makeStyles(() => ({
  listItem: {
    '&:hover': {
      backgroundColor: '#303030',
      cursor: 'pointer',
    },
  },
  listItemSelected: {
    backgroundColor: '#303030',
  },
}));

const SidebarUploadsList = (): JSX.Element => {
  const classes = useStyles();
  const uploads = useRecoilValueLoadable(uploadsListState);
  const location = useLocation();
  const navigate = useNavigate();

  if (uploads.state !== 'hasValue') {
    return <div></div>;
  }

  const uploadsWithDate: UploadListItem[] = uploads.contents.map(
    (u: UploadListItem) => ({
      ...u,
      createdAt: dayjs(u.createdAt).format('MMM DD, YYYY HH:mm:ss'),
    })
  );

  const onSelectUpload = (uploadId: number) => {
    navigate(`/uploads/${uploadId}`);
  };

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
          <List.Item
            className={cx(classes.listItem, {
              [classes.listItemSelected]:
                location.pathname === `/uploads/${upload.id}`,
            })}
            onClick={() => onSelectUpload(upload.id)}
          >
            <Text>{upload.accountName}</Text>
            <Text>{upload.createdAt}</Text>
          </List.Item>
        )}
      />
    </div>
  );
};

export default SidebarUploadsList;
