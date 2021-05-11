import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Table, Tag } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { selectTagsArray } from '../../Redux/Tags/selectors';
import { RegexesList } from '../RegexesList';
import './styles.scss';

function TagTable() {

  const history = useHistory();
  const tags = useSelector(selectTagsArray);

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
          className='TagTable__edit-button'
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
        className='TagTable__create-button'
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

export default TagTable;