import { SimpleGrid } from "@mantine/core";
import dayjs from "dayjs";
import useSWR from "swr";
import {
  AmountOverTimeFetcher,
  CurrentNetWorthEndpoint,
  CurrentNetWorthFetcher,
  NetWorthOverTimeEndpoint,
} from "../Fetchers";
import { FormatMoney } from "../utils";
import AmountOverTimeChart from "./AmountOverTimeChart";
import CategoriesOverTimeChart from "./CategoriesOverTimeChart";
import IncomeVsExpenseChart from "./IncomeVsExpenseChart";

export default function Trends() {
  const netWorthOverTimeResponse = useSWR(
    NetWorthOverTimeEndpoint(
      dayjs().subtract(365, "day").format("YYYY-MM-DD"),
      dayjs().format("YYYY-MM-DD")
    ),
    AmountOverTimeFetcher
  );

  const currentNetWorthResponse = useSWR(
    CurrentNetWorthEndpoint(),
    CurrentNetWorthFetcher
  );

  const netWorthTitle = currentNetWorthResponse.data?.data
    ? `Net Worth - ${FormatMoney(currentNetWorthResponse.data.data.amount)}`
    : "Net Worth";

  return (
    <SimpleGrid cols={2}>
      <IncomeVsExpenseChart />
      <AmountOverTimeChart
        response={netWorthOverTimeResponse}
        title={netWorthTitle}
      />
      <CategoriesOverTimeChart />
    </SimpleGrid>
  );
}
