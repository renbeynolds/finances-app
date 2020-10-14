import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Table, Tag } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { requestFetchTags } from '../../Redux/Tags/actions';
import { selectTagsArray } from '../../Redux/Tags/selectors';
import { RegexesList } from '../RegexesList';
import './styles.scss';

function TagList() {

  const dispatch = useDispatch();
  const history = useHistory();
  const tags = useSelector(selectTagsArray);

  useEffect(() => {
    dispatch(requestFetchTags());
  }, [dispatch]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (name, tag) => (
        <Tag color={tag.color}>{name}</Tag>
      )
    },
    {
      title: 'Edit',
      dataIndex: 'id',
      render: (id) => (
        <Button
          type='primary' shape='circle'
          icon={<EditOutlined />} size='default'
          onClick={() => history.push(`/tags/edit/${id}`)}
          className='TagList__edit-button'
        />
      )
    }
  ];

  return (
    <>
      <Button
        type='primary' shape='round'
        icon={<PlusCircleOutlined />} size='default'
        onClick={() => history.push('/tags/create')}
        className='TagList__create-button'
      >Add Tag</Button>
      <Table
        columns={columns}
        dataSource={tags}
        rowKey='id'
        expandable={{
          expandedRowRender: tag => <RegexesList regexes={tag.regexes} />,
        }}
      />
    </>
  );
}

export default TagList;