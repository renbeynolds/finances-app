import { NumberInput, NumberInputProps } from "@mantine/core";
import { IconCurrencyDollar } from "@tabler/icons-react";

export default function MoneyInput(props: NumberInputProps) {
  return (
    <NumberInput
      leftSection={<IconCurrencyDollar />}
      placeholder="0"
      decimalScale={2}
      fixedDecimalScale
      hideControls
      {...props}
    />
  );
}
