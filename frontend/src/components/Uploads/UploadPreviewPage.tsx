import { Box, Button, Card, Group, Stack, Text, Title } from "@mantine/core";
import dayjs from "dayjs";
import { DataTable } from "mantine-datatable";
import React from "react";
import { useLocation, useNavigate } from "react-router";
import useSWR from "swr";
import { DefaultTransactionFilters } from "../../context/TransactionFiltersContext";
import { Response } from "../../data/Response";
import { Transaction } from "../../data/Transaction";
import { ParsedTransaction, Upload } from "../../data/Upload";
import { TransactionsEndpoint, TransactionsFetcher } from "../../Fetchers";
import { FormatMoney } from "../../utils";

type MergedRecord = 
  | { type: 'parsed'; data: ParsedTransaction; id: string, balance: number | undefined }
  | { type: 'existing'; data: Transaction; id: string, balance: number | undefined };

export default function UploadPreviewPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as {
    previewData?: { parsedTransactions: ParsedTransaction[] };
    file?: File;
    bankAccountId?: string;
  };

  const { data: recentTransactionsResp } = useSWR(
    state?.bankAccountId
      ? TransactionsEndpoint(
          1,
          50,
          DefaultTransactionFilters,
          state.bankAccountId,
          undefined,
          undefined,
          true
        )
      : null,
    TransactionsFetcher
  );

  const [selectedRecords, setSelectedRecords] = React.useState<MergedRecord[]>(() => {
    if (!state?.previewData) return [];
    return state.previewData.parsedTransactions
      .filter((t) => !t.isDuplicate)
      .map(t => ({ type: 'parsed', data: t, id: `parsed-${t.index}` } as MergedRecord));
  });
  
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  if (!state || !state.previewData || !state.file || !state.bankAccountId) {
    return (
      <Stack align="center" mt="xl">
        <Text>Invalid state. Please try uploading again.</Text>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </Stack>
    );
  }

  const existingRecords: MergedRecord[] = (recentTransactionsResp?.data || []).map((t) => ({
    type: 'existing',
    data: t,
    id: `existing-${t.id}`,
    balance: t.balance
  }));

  const parsedRecords: MergedRecord[] = state.previewData.parsedTransactions.map((t) => ({
    type: 'parsed',
    data: t,
    id: `parsed-${t.index}`,
    balance: undefined // placeholder - will be calculated below
  }));

  const allRecords = [...parsedRecords, ...existingRecords].sort((a, b) => {
    const dateA = dayjs(a.type === 'parsed' ? (a.data as ParsedTransaction).date : (a.data as Transaction).date);
    const dateB = dayjs(b.type === 'parsed' ? (b.data as ParsedTransaction).date : (b.data as Transaction).date);
    return dateB.valueOf() - dateA.valueOf();
  });

  for (let i = allRecords.length - 1; i >=0; i--) {
    const record = allRecords[i];
    if (i < allRecords.length -1 && record.type === 'parsed' && selectedRecords.some(r => r.id === record.id)) {
      record.balance = (allRecords[i+1].balance ?? 0) + record.data.amount;
    } else if (i < allRecords.length -1 && record.type === 'parsed') {
      record.balance = allRecords[i+1].balance ?? 0;
    }
  }

  const handleConfirm = async () => {
    setIsSubmitting(true);``
    const formData = new FormData();
    formData.append("csv", state.file!);
    formData.append("bankAccountId", state.bankAccountId!);

    const selectedIndices = new Set(
      selectedRecords.filter(r => r.type === 'parsed').map(r => (r.data as ParsedTransaction).index)
    );

    const excluded = state.previewData!.parsedTransactions
      .filter((pt) => !selectedIndices.has(pt.index))
      .map((pt) => pt.index);
    
    formData.append("excludedIndices", JSON.stringify(excluded));

    const response: Response<Upload> = await fetch("/api/uploads", {
      method: "POST",
      body: formData,
    }).then((res) => res.json());

    setIsSubmitting(false);
    if (response.success) {
      navigate(`/uploads/${response.data.id}`, { replace: true });
    } else {
      console.error("Upload failed", response);
    }
  };

  return (
    <Stack h="100%">
      <Group justify="space-between">
        <Box>
          <Title order={2}>Upload Preview</Title>
          <Text size="sm" c="dimmed">
            Review the parsed transactions from your CSV. Duplicates are deselected by default.
          </Text>
        </Box>
        <Group>
          <Button variant="default" onClick={() => navigate(-1)} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} loading={isSubmitting}>
            Confirm Upload
          </Button>
        </Group>
      </Group>

      <Card withBorder padding="0" style={{ flex: 1, minHeight: 0 }}>
        <DataTable
          withTableBorder
          withColumnBorders
          records={allRecords}
          idAccessor="id"
          selectedRecords={selectedRecords}
          onSelectedRecordsChange={(newSelection) => {
            const parsedSelection = newSelection.filter(r => r.type === 'parsed');
            setSelectedRecords(parsedSelection);
          }}
          isRecordSelectable={(r) => r.type === 'parsed'}
          rowBackgroundColor={(r) => {
            if (r.type === 'parsed') {
              const pt = r.data as ParsedTransaction;
              return pt.isDuplicate ? "rgba(255, 0, 0, 0.1)" : "rgba(0, 255, 0, 0.05)";
            }
            return undefined;
          }}
          columns={[
            {
              accessor: "date",
              render: (r) => <Text size="sm">{dayjs(r.type === 'parsed' ? (r.data as ParsedTransaction).date : (r.data as Transaction).date).format("dd MMM DD, YY")}</Text>,
            },
            {
              accessor: "description",
              render: (r) => <Text size="sm">{r.type === 'parsed' ? (r.data as ParsedTransaction).description : (r.data as Transaction).description}</Text>,
            },
            {
              accessor: "amount",
              render: (r) => {
                const amount = r.type === 'parsed' ? (r.data as ParsedTransaction).amount : (r.data as Transaction).amount;
                return (
                  <Text size="sm" c={amount > 0 ? "green" : "red"}>
                    {FormatMoney(amount)}
                  </Text>
                );
              }
            },
            {
              accessor: "balance",
              render: (r) => {
                const balance = r.balance ?? 0;
                return (
                  <Text size="sm" c={balance > 0 ? "green" : "red"}>
                    {FormatMoney(balance)}
                  </Text>
                );
              }
            },
            {
              accessor: "status",
              render: (r) => {
                 if (r.type === 'existing') return <Text size="xs" c="dimmed">Existing DB</Text>;
                 const pt = r.data as ParsedTransaction;
                 return <Text size="xs" c={pt.isDuplicate ? "red" : "blue"}>{pt.isDuplicate ? "Duplicate" : "New"}</Text>
              }
            }
          ]}
        />
      </Card>
    </Stack>
  );
}
