import { Card, Stack, Text } from '@mantine/core';
import React from 'react';
import useSWR from 'swr';
import { IncomeVsAverageEndpoint, IncomeVsAverageFetcher } from '../Fetchers';
import { DateFilterContext } from '../context/DateFilterContext';
import { FormatMoney, PreviousNMonths } from '../utils';

const AVERAGE_OVER_N_MONTHS = 6;

export default function AmountVsAverage() {
  const dateFilter = React.useContext(DateFilterContext);
  const averageOver = PreviousNMonths(dateFilter, AVERAGE_OVER_N_MONTHS);

  const { data, error, isLoading } = useSWR(
    `${IncomeVsAverageEndpoint}?from=${dateFilter[0]}&to=${dateFilter[1]}&avg_from=${averageOver[0]}&avg_to=${averageOver[1]}`,
    IncomeVsAverageFetcher
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <Card>
      <Card.Section withBorder inheritPadding py='xs'>
        <Text fw={500}>Income</Text>
      </Card.Section>
      <Card.Section inheritPadding py='xs'>
        <Stack>
          <Text>Amount: {FormatMoney(data!.data.amount)}</Text>
          <Text>
            {AVERAGE_OVER_N_MONTHS} Month Average:{' '}
            {FormatMoney(data!.data.average)}
          </Text>
        </Stack>
      </Card.Section>
    </Card>
  );
}
