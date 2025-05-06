import { Button, Stack, Text } from '@mantine/core';
import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { UseLazyCategories } from '../../context/CategoriesContext';

export default function CategoriesList() {
  const categories = UseLazyCategories();
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (location.pathname === '/categories' && categories.length) {
      navigate(`/categories/${categories[0].id}`);
    }
  }, [categories, navigate, location.pathname]);

  return (
    <div
      style={{
        height: '100%',
        overflowY: 'auto',
      }}
    >
      <Stack align='stretch' justify='flex-start' gap='md'>
        {categories.map((category, index) => (
          <Button
            key={index}
            variant='outline'
            h='3rem'
            justify='space-between'
            onClick={() => {
              navigate(`/categories/${category.id}`);
            }}
          >
            <Stack gap='0'>
              <Text size='l'>{category.name}</Text>
            </Stack>
          </Button>
        ))}
      </Stack>
    </div>
  );
}
