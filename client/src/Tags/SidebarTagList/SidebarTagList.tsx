import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { makeStyles } from '@material-ui/styles';
import { Button, List, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValueLoadable } from 'recoil';
import { tagsState } from '../TagsState';

const { Text } = Typography;

const useStyles = makeStyles(() => ({
  listItem: {
    '&:hover': {
      backgroundColor: '#303030',
      cursor: 'pointer',
    },
  },
}));

const SidebarTagList = (): JSX.Element => {
  const tags = useRecoilValueLoadable(tagsState);
  const navigate = useNavigate();
  const classes = useStyles();

  const onAddTagClick = () => {
    navigate('/tags/new');
  };

  const onEditTagClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    tagId: number
  ) => {
    event.stopPropagation();
    navigate(`/tags/${tagId}/edit`);
  };

  const onSelectTag = (tagId: number) => {
    navigate(`/tags/${tagId}`);
  };

  if (tags.state !== 'hasValue') {
    return <div></div>;
  }

  return (
    <div
      style={{
        minHeight: 0,
        overflowY: 'scroll',
        marginBottom: '2rem',
      }}
    >
      <List
        size='small'
        dataSource={tags.contents}
        renderItem={(tag) => (
          <List.Item
            className={classes.listItem}
            onClick={() => onSelectTag(tag.id)}
          >
            <Text>{tag.name}</Text>
            <Button
              type='primary'
              icon={<EditOutlined />}
              shape='circle'
              ghost
              onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                onEditTagClick(event, tag.id)
              }
              size='small'
            />
          </List.Item>
        )}
      />
      <Button
        style={{ marginLeft: '16px', marginTop: '8px' }}
        type='ghost'
        size='small'
        icon={<PlusOutlined />}
        onClick={onAddTagClick}
      >
        Add Tag
      </Button>
    </div>
  );
};

export default SidebarTagList;
