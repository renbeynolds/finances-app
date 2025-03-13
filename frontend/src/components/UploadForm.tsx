import { Button, FileInput, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';

interface UploadFormValues {
  csv: File | null;
  accountId: string;
}

type UploadFormProps = {
  accountId: string;
};

export default function UploadForm({ accountId }: UploadFormProps) {
  const form = useForm<UploadFormValues>({
    initialValues: {
      csv: null,
      accountId: accountId,
    },
    validate: {
      csv: (value) => (!value ? 'CSV is required' : null),
      accountId: (value) => (!value ? 'Account ID is required' : null),
    },
  });

  const handleSubmit = async (values: UploadFormValues) => {
    if (!values.csv) return;

    const formData = new FormData();
    formData.append('csv', values.csv);
    formData.append('accountId', values.accountId);

    try {
      const response = await fetch('/api/uploads', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      notifications.show({
        title: 'Success',
        message: 'File uploaded successfully',
        color: 'green',
      });

      form.reset();
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to upload file',
        color: 'red',
      });
    }
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Stack>
        <FileInput
          {...form.getInputProps('csv')}
          placeholder='Select File'
          accept='.csv'
          required
        />
        <Button type='submit' loading={form.submitting}>
          Upload
        </Button>
      </Stack>
    </form>
  );
}
