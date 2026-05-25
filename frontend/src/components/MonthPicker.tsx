import { ActionIcon, Group } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import { IconCaretLeft, IconCaretRight } from "@tabler/icons-react";
import dayjs from "dayjs";
import React from "react";
import {
  TransactionFiltersContext,
  TransactionFiltersDispatchContext,
} from "../context/TransactionFiltersContext";

export default function MonthPicker() {
  const transactionFilters = React.useContext(TransactionFiltersContext);
  const dispatchTransactionFilters = React.useContext(
    TransactionFiltersDispatchContext,
  );

  const [value, setValue] = React.useState<Date | null>(
    dayjs(transactionFilters.Date[1]).toDate(),
  );

  React.useEffect(() => {
    if (dispatchTransactionFilters && value) {
      dispatchTransactionFilters({
        type: "SET_DATE_FILTER",
        payload: [
          dayjs(value).startOf("month").format("YYYY-MM-DD"),
          dayjs(value).endOf("month").format("YYYY-MM-DD"),
        ],
      });
    }
  }, [dispatchTransactionFilters, value]);

  const handlePrevMonth = () => {
    setValue(dayjs(value).subtract(1, "month").toDate());
  };

  const handleNextMonth = () => {
    setValue(dayjs(value).add(1, "month").toDate());
  };

  return (
    <Group gap="0">
      <ActionIcon
        variant="transparent"
        aria-label="Previous Month"
        onClick={handlePrevMonth}
      >
        <IconCaretLeft style={{ width: "70%", height: "70%" }} stroke={1.5} />
      </ActionIcon>
      <MonthPickerInput
        placeholder="Select Month"
        value={value}
        onChange={setValue}
        maxDate={new Date()}
        w={150}
      />
      <ActionIcon
        variant="transparent"
        aria-label="Next Month"
        onClick={handleNextMonth}
        style={{
          background: "transparent",
        }}
        disabled={dayjs(value).format("YYYY-MM") === dayjs().format("YYYY-MM")}
      >
        <IconCaretRight style={{ width: "70%", height: "70%" }} stroke={1.5} />
      </ActionIcon>
    </Group>
  );
}
