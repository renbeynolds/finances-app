import { ActionIcon, TextInput } from "@mantine/core";
import { IconSearch, IconX } from "@tabler/icons-react";
import * as React from "react";
import { TransactionFiltersAction } from "../context/TransactionFiltersContext";

type TransactionTableDescriptionFilterProps = {
  descriptionFilter: string;
  dispatchTransactionFilters: React.Dispatch<TransactionFiltersAction> | null;
  close: () => void;
};

export default function TransactionTableDescriptionFilter({
  descriptionFilter,
  dispatchTransactionFilters,
  close,
}: TransactionTableDescriptionFilterProps) {
  const [descriptionSearch, setDescriptionSearch] =
    React.useState(descriptionFilter);

  const enterFunction = React.useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Enter" && dispatchTransactionFilters) {
        dispatchTransactionFilters({
          type: "SET_DESCRIPTION_FILTER",
          payload: descriptionSearch,
        });
        close();
      }
    },
    [close, dispatchTransactionFilters, descriptionSearch],
  );

  React.useEffect(() => {
    document.addEventListener("keypress", enterFunction);
    return () => {
      document.removeEventListener("keypress", enterFunction);
    };
  }, [enterFunction]);

  return (
    <TextInput
      label="Description"
      description="Fuzzy search"
      placeholder="Enter search string..."
      leftSection={<IconSearch size={16} />}
      rightSection={
        <ActionIcon
          size="sm"
          variant="transparent"
          c="dimmed"
          onClick={() => {
            setDescriptionSearch("");
            dispatchTransactionFilters!({
              type: "SET_DESCRIPTION_FILTER",
              payload: "",
            });
            close();
          }}
        >
          <IconX size={14} />
        </ActionIcon>
      }
      value={descriptionSearch}
      onBlur={() => {
        dispatchTransactionFilters!({
          type: "SET_DESCRIPTION_FILTER",
          payload: descriptionSearch,
        });
      }}
      onChange={(e) => setDescriptionSearch(e.currentTarget.value)}
    />
  );
}
