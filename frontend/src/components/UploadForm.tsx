import { Button, FileInput, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';

interface UploadFormValues {
  csv: File;
}

type UploadFormProps = {
  accountId: string;
};

export default function UploadForm({ accountId }: UploadFormProps) {
  const form = useForm<UploadFormValues>({
    validate: {
      csv: (value) => (!value ? 'CSV is required' : null),
    },
  });

  const handleSubmit = async (values: UploadFormValues) => {
    const formData = new FormData();
    formData.append('csv', values.csv);
    formData.append('accountId', accountId);

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
