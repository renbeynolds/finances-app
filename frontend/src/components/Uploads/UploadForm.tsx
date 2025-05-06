import { Button, FileInput, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router';
import { Response } from '../../data/Response';
import { Upload } from '../../data/Upload';

interface UploadFormValues {
  csv: File;
}

type UploadFormProps = {
  accountId: string;
  close: () => void;
};

export default function UploadForm({ accountId, close }: UploadFormProps) {
  const navigate = useNavigate();

  const form = useForm<UploadFormValues>({
    validate: {
      csv: (value) => (!value ? 'CSV is required' : null),
    },
  });

  const handleSubmit = async (values: UploadFormValues) => {
    const formData = new FormData();
    formData.append('csv', values.csv);
    formData.append('accountId', accountId);

    const response: Response<Upload> = await fetch('/api/uploads', {
      method: 'POST',
      body: formData,
    }).then((res) => res.json());

    if (response.code === 200) {
      close();
      navigate(`/uploads/${response.data.id}`);
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
