import Icon, { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { makeStyles } from '@material-ui/styles';
import { Button, List, Tag, Typography } from 'antd';
import cx from 'classnames';
import _ from 'lodash';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValueLoadable } from 'recoil';
import { categoriesState } from '../CategoriesState';

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

const SidebarCategoryList = (): JSX.Element => {
  const categories = useRecoilValueLoadable(categoriesState);
  const navigate = useNavigate();
  const location = useLocation();
  const classes = useStyles();

  const onAddCategoryClick = () => {
    navigate('/categories/new');
  };

  const onEditCategoryClick = (event: React.MouseEvent, categoryId: number) => {
    event.stopPropagation();
    navigate(`/categories/${categoryId}/edit`);
  };

  const onSelectCategory = (categoryId: number) => {
    navigate(`/categories/${categoryId}`);
  };

  if (categories.state !== 'hasValue') {
    return <div></div>;
  }

  const topLevelCategories = _.sortBy(
    categories.contents.filter((c) => !c.parentCategoryId),
    'name'
  ).map((c) => ({
    ...c,
    subcategories: categories.contents.filter(
      (sc) => sc.parentCategoryId === c.id
    ),
  }));

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
        dataSource={topLevelCategories}
        renderItem={(category) => (
          <>
            <List.Item
              className={cx(classes.listItem, {
                [classes.listItemSelected]:
                  location.pathname === `/categories/${category.id}`,
              })}
              onClick={() => onSelectCategory(category.id)}
            >
              <Tag
                color={category.color}
                icon={
                  category.iconUrl && (
                    <Icon
                      component={() => (
                        <img
                          style={{
                            height: '14px',
                          }}
                          src={category.iconUrl}
                        />
                      )}
                    />
                  )
                }
              >
                {category.name}
              </Tag>
              <Button
                type='primary'
                icon={<EditOutlined />}
                shape='circle'
                ghost
                onClick={(event: React.MouseEvent) =>
                  onEditCategoryClick(event, category.id)
                }
                size='small'
              />
            </List.Item>
            {category.subcategories.map((subcategory) => (
              <List.Item
                className={cx(classes.listItem, {
                  [classes.listItemSelected]:
                    location.pathname === `/categories/${subcategory.id}`,
                })}
                onClick={() => onSelectCategory(subcategory.id)}
              >
                <div style={{ marginLeft: '8px' }}>
                  <Text>└ &nbsp;</Text>
                  <Tag
                    color={subcategory.color}
                    icon={
                      subcategory.iconUrl && (
                        <Icon
                          component={() => (
                            <img
                              style={{
                                height: '14px',
                              }}
                              src={subcategory.iconUrl}
                            />
                          )}
                        />
                      )
                    }
                  >
                    {subcategory.name}
                  </Tag>
                </div>
                <Button
                  type='primary'
                  icon={<EditOutlined />}
                  shape='circle'
                  ghost
                  onClick={(event: React.MouseEvent) =>
                    onEditCategoryClick(event, subcategory.id)
                  }
                  size='small'
                />
              </List.Item>
            ))}
          </>
        )}
      />
      <Button
        style={{ marginLeft: '16px', marginTop: '8px' }}
        type='ghost'
        size='small'
        icon={<PlusOutlined />}
        onClick={onAddCategoryClick}
      >
        Add Category
      </Button>
    </div>
  );
};

export default SidebarCategoryList;
