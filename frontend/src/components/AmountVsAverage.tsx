import { Card, Stack, Text, Title } from '@mantine/core';
import React from 'react';
import useSWR from 'swr';
import { AmountVsAverageFetcher } from '../Fetchers';
import { DateFilterContext } from '../context/DateFilterContext';
import { FormatMoney, PreviousNMonths } from '../utils';

const AVERAGE_OVER_N_MONTHS = 12;

interface AmountVsAverageProps {
  title: string;
  endpoint: string;
  color: string;
}

export default function AmountVsAverage({
  title,
  endpoint,
  color,
}: AmountVsAverageProps) {
  const dateFilter = React.useContext(DateFilterContext);
  const averageOver = PreviousNMonths(dateFilter, AVERAGE_OVER_N_MONTHS);

  const { data, error, isLoading } = useSWR(
    `${endpoint}?from=${dateFilter[0]}&to=${dateFilter[1]}&avg_from=${averageOver[0]}&avg_to=${averageOver[1]}`,
    AmountVsAverageFetcher
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <Card>
      <Card.Section withBorder inheritPadding py='xs'>
        <Title order={4}>{title}</Title>
      </Card.Section>
      <Card.Section inheritPadding py='xs'>
        <Stack>
          <Title ta='center' order={2} c={color}>
            {FormatMoney(data!.data.amount)}
          </Title>
          <Text ta='center'>
            {AVERAGE_OVER_N_MONTHS} Month Average:{' '}
            {FormatMoney(data!.data.average)}
          </Text>
        </Stack>
      </Card.Section>
    </Card>
  );
}
