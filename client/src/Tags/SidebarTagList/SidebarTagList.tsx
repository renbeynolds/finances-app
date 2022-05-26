import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, List, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValueLoadable } from 'recoil';
import { tagsState } from '../TagsState';

const { Text } = Typography;

const SidebarTagList = (): JSX.Element => {
  const tags = useRecoilValueLoadable(tagsState);
  const navigate = useNavigate();

  const onAddTagClick = () => {
    navigate('/tags/new');
  };

  const onEditTagClick = (tagId: number) => {
    navigate(`/tags/${tagId}/edit`);
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
          <List.Item onClick={() => navigate(`/tags/${tag.id}`)}>
            <Text>{tag.name}</Text>
            <Button
              type='primary'
              icon={<EditOutlined />}
              shape='circle'
              ghost
              onClick={() => onEditTagClick(tag.id)}
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
