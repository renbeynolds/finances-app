import { Button, FileInput, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router";
import { Response } from "../../data/Response";
import { PreviewUploadResponse } from "../../data/Upload";

interface UploadFormValues {
  csv: File;
}

type UploadFormProps = {
  bankAccountId: string;
  close: () => void;
};

export default function UploadForm({ bankAccountId, close }: UploadFormProps) {
  const navigate = useNavigate();

  const form = useForm<UploadFormValues>({
    validate: {
      csv: (value) => (!value ? "CSV is required" : null),
    },
  });

  const handleSubmit = async (values: UploadFormValues) => {
    const formData = new FormData();
    formData.append("csv", values.csv);
    formData.append("bankAccountId", bankAccountId);

    const response: Response<PreviewUploadResponse> = await fetch("/api/uploads/preview", {
      method: "POST",
      body: formData,
    }).then((res) => res.json());

    if (response.success) {
      close();
      navigate(`/uploads/preview`, { state: { previewData: response.data, file: values.csv, bankAccountId } });
    }
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Stack>
        <FileInput
          {...form.getInputProps("csv")}
          placeholder="Select File"
          accept=".csv"
          required
        />
        <Button type="submit" loading={form.submitting}>
          Upload
        </Button>
      </Stack>
    </form>
  );
}
