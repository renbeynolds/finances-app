import { PlusOutlined } from '@ant-design/icons';
import { Button, List, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tagsState } from '../../Tags/TagsState';

const { Text } = Typography;

const TagsList = (): JSX.Element => {
  const tags = useRecoilValue(tagsState);
  const navigate = useNavigate();

  const onAddTagClick = () => {
    navigate('/tags/new');
  };

  return (
    <>
      <List
        size='small'
        dataSource={tags}
        renderItem={(tag) => (
          <List.Item>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Text>{tag.name}</Text>
            </div>
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
    </>
  );
};

export default TagsList;
