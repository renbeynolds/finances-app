import {
  ActionIcon,
  Badge,
  Combobox,
  Pill,
  PillsInput,
  useCombobox,
} from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useState } from "react";
import { UseLazyCategories } from "../context/CategoriesContext";
import { Transaction } from "../data/Transaction";

interface TransactionTableCategoryComboboxProps {
  transaction: Transaction;
  updateTransaction: (transaction: Transaction) => void;
}

export default function TransactionTableCategoryCombobox({
  transaction,
  updateTransaction,
}: TransactionTableCategoryComboboxProps) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
  });
  const categories = UseLazyCategories();
  const [search, setSearch] = useState("");
  const [value, setValue] = useState<string[]>(
    transaction.categoryId ? [`${transaction.categoryId}`] : [],
  );

  const handleValueSelect = (_: string) => {
    combobox.closeDropdown();
    updateTransaction({
      ...transaction,
      categoryId: parseInt(_),
    });
    setSearch("");
    setValue([_]);
  };

  const handleValueRemove = (_: string) => {
    updateTransaction({
      ...transaction,
      categoryId: undefined,
    });
    setValue([]);
  };

  const values = value.map((item) => (
    <Badge
      key={item}
      bg={categories.find((c) => c.id === parseInt(item))?.color || "gray"}
      rightSection={
        <ActionIcon
          size="xs"
          onClick={() => handleValueRemove(item)}
          bg="transparent"
        >
          <IconX />
        </ActionIcon>
      }
    >
      {categories.find((c) => c.id === parseInt(item))?.name}
    </Badge>
  ));

  const options = categories
    .filter((c) => c.name.toLowerCase().includes(search.toLowerCase().trim()))
    .map((category) => (
      <Combobox.Option key={category.id} value={`${category.id}`}>
        {category.name}
      </Combobox.Option>
    ));

  return (
    <Combobox store={combobox} onOptionSubmit={handleValueSelect}>
      <Combobox.DropdownTarget>
        <PillsInput onClick={() => combobox.openDropdown()}>
          <Pill.Group>
            {values}
            <Combobox.EventsTarget>
              <PillsInput.Field
                value={search}
                onChange={(event) => {
                  combobox.updateSelectedOptionIndex();
                  setSearch(event.currentTarget.value);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Backspace" && search.length === 0) {
                    event.preventDefault();
                    handleValueRemove(value[value.length - 1]);
                  }
                }}
              />
            </Combobox.EventsTarget>
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown>
        <Combobox.Options mah={200} style={{ overflowY: "auto" }}>
          {options.length > 0 ? (
            options
          ) : (
            <Combobox.Empty>No Categories</Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
