import { NavLink, Stack } from '@mantine/core';
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
        {categories
          .sort((a, b) => (a.name < b.name ? -1 : 1))
          .map((category, index) => (
            <NavLink
              key={index}
              active={location.pathname === `/categories/${category.id}`}
              onClick={() => navigate(`/categories/${category.id}`)}
              label={category.name}
            />
          ))}
      </Stack>
    </div>
  );
}
