import { Card, Loader, Title } from '@mantine/core';
import { FormatMoney } from '../utils';

interface AmountCardProps {
  title: string;
  amount?: number;
  isLoading: boolean;
}

export default function AmountCard({
  title,
  amount,
  isLoading,
}: AmountCardProps) {
  return (
    <Card>
      <Card.Section withBorder inheritPadding py='xs'>
        <Title order={4}>{title}</Title>
      </Card.Section>
      <Card.Section inheritPadding py='xs'>
        {isLoading ? (
          <Loader />
        ) : (
          <Title ta='center' order={2} c={amount! < 0 ? 'red' : 'green'}>
            {FormatMoney(amount!)}
          </Title>
        )}
      </Card.Section>
    </Card>
  );
}
