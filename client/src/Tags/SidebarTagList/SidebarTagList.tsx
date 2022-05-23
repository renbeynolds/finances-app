import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, List, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tagsState } from '../TagsState';

const { Text } = Typography;

const SidebarTagList = (): JSX.Element => {
  const tags = useRecoilValue(tagsState);
  const navigate = useNavigate();

  const onAddTagClick = () => {
    navigate('/tags/new');
  };

  const onEditTagClick = (tagId: number) => {
    navigate(`/tags/${tagId}`);
  };

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
        dataSource={tags}
        renderItem={(tag) => (
          <List.Item>
            <Text>{tag.name}</Text>
            <Button
              icon={<EditOutlined />}
              shape='circle'
              onClick={() => onEditTagClick(tag.id)}
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
