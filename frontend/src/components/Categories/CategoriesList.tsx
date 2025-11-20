import {
  ActionIcon,
  Button,
  Group,
  Modal,
  NavLink,
  Stack,
} from "@mantine/core";
import { IconEdit, IconPlus } from "@tabler/icons-react";
import React from "react";
import { useLocation, useNavigate } from "react-router";
import { UseLazyCategories } from "../../context/CategoriesContext";
import CategoryForm from "./CategoryForm";

export default function CategoriesList() {
  const categories = UseLazyCategories();
  const location = useLocation();
  const navigate = useNavigate();
  const [categoryModalOpened, setCategoryModalOpened] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState<any>(null);

  const handleNewCategory = () => {
    setSelectedCategory(null);
    setCategoryModalOpened(true);
  };

  const handleEditCategory = (category: any) => {
    setSelectedCategory(category);
    setCategoryModalOpened(true);
  };

  const handleCloseModal = () => {
    setCategoryModalOpened(false);
    setSelectedCategory(null);
  };

  React.useEffect(() => {
    if (location.pathname === "/categories" && categories.length) {
      navigate(`/categories/${categories[0].id}`);
    }
  }, [categories, navigate, location.pathname]);

  return (
    <>
      <Stack align="stretch" justify="space-between" gap="md" h="100%">
        <Stack
          align="stretch"
          justify="flex-start"
          gap="md"
          style={{ overflowY: "auto", flexGrow: 1 }}
        >
          {categories
            .sort((a, b) => (a.name < b.name ? -1 : 1))
            .map((category, index) => (
              <Group key={index} justify="space-between" wrap="nowrap">
                <NavLink
                  active={location.pathname === `/categories/${category.id}`}
                  onClick={() => navigate(`/categories/${category.id}`)}
                  label={category.name}
                  style={{ flex: 1 }}
                />
                <ActionIcon
                  variant="subtle"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditCategory(category);
                  }}
                >
                  <IconEdit size={14} />
                </ActionIcon>
              </Group>
            ))}
        </Stack>
        <Button
          variant="filled"
          mih={36}
          leftSection={<IconPlus size={14} />}
          onClick={handleNewCategory}
        >
          New Category
        </Button>
      </Stack>
      <Modal
        opened={categoryModalOpened}
        onClose={handleCloseModal}
        title={selectedCategory ? "Edit Category" : "New Category"}
      >
        <CategoryForm category={selectedCategory} close={handleCloseModal} />
      </Modal>
    </>
  );
}
