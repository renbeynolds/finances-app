import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, List } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { requestFetchTags } from '../../Redux/Tags/actions';
import { selectTagsArray } from '../../Redux/Tags/selectors';

function TagList() {

  const dispatch = useDispatch();
  const history = useHistory();
  const tags = useSelector(selectTagsArray);

  useEffect(() => {
    dispatch(requestFetchTags());
  }, [dispatch]);

  return (
    <List
      header={
        <Button
          type='primary' shape='round'
          icon={<PlusCircleOutlined />} size='default'
          onClick={() => history.push('/tags/create')}
        >Add Tag</Button>
      }
      bordered
      dataSource={tags}
      renderItem={item => (
        <List.Item>
          {item.name}
        </List.Item>
      )}
    />
  );
}

export default TagList;