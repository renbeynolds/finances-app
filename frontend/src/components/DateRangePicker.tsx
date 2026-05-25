import { ActionIcon, Group, Menu } from "@mantine/core";
import { DatePickerInput, DatesRangeValue } from "@mantine/dates";
import { IconCalendarBolt } from "@tabler/icons-react";
import dayjs from "dayjs";
import React from "react";
import {
  TransactionFiltersContext,
  TransactionFiltersDispatchContext,
} from "../context/TransactionFiltersContext";

const dateRanges: { label: React.ReactNode; value: [Date, Date] }[] = [
  {
    label: "This Month",
    value: [dayjs().startOf("month").toDate(), dayjs().endOf("month").toDate()],
  },
  {
    label: "Last Month",
    value: [
      dayjs().subtract(1, "month").startOf("month").toDate(),
      dayjs().subtract(1, "month").endOf("month").toDate(),
    ],
  },
  {
    label: "Year to Date",
    value: [dayjs().startOf("year").toDate(), new Date()],
  },
  {
    label: "Last Year",
    value: [
      dayjs().subtract(1, "year").startOf("year").toDate(),
      dayjs().subtract(1, "year").endOf("year").toDate(),
    ],
  },
  {
    label: "All Time",
    value: [new Date(0), new Date()],
  },
];

export default function DateRangePicker() {
  const transactionFilters = React.useContext(TransactionFiltersContext);
  const dispatchTransactionFilters = React.useContext(
    TransactionFiltersDispatchContext,
  );

  const [value, setValue] = React.useState<[Date | null, Date | null]>([
    dayjs(transactionFilters.Date[0]).toDate(),
    dayjs(transactionFilters.Date[1]).toDate(),
  ]);

  const handleChange = React.useCallback(
    (value: DatesRangeValue) => {
      setValue(value);
      if (dispatchTransactionFilters && value[0] && value[1]) {
        dispatchTransactionFilters!({
          type: "SET_DATE_FILTER",
          payload: [
            value[0].toISOString().split("T")[0],
            value[1].toISOString().split("T")[0],
          ],
        });
      }
    },
    [dispatchTransactionFilters, setValue],
  );

  return (
    <Group>
      <DatePickerInput
        type="range"
        placeholder="Select Date Range"
        value={value}
        maxDate={new Date()}
        onChange={handleChange}
        popoverProps={{
          withinPortal: false,
        }}
      />
      <Menu>
        <Menu.Target>
          <ActionIcon variant="default">
            <IconCalendarBolt />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown w="200">
          {dateRanges.map((range, index) => (
            <Menu.Item
              key={index}
              onClick={() => handleChange([range.value[0], range.value[1]])}
            >
              {range.label}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}
