import { TextInput } from "@mantine/core";
import React from "react";
import { Transaction } from "../data/Transaction";

interface TransactionTableCommentBoxProps {
  transaction: Transaction;
  updateTransaction: (transaction: Transaction) => void;
}

export default function TransactionTableCommentBox({
  transaction,
  updateTransaction,
}: TransactionTableCommentBoxProps) {
  const [value, setValue] = React.useState<string | undefined>(
    transaction.comment,
  );

  const doUpdate = React.useCallback(() => {
    updateTransaction({
      ...transaction,
      comment: value,
    });
  }, [transaction, value]);

  return (
    <TextInput
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={doUpdate}
    />
  );
}
