import { UploadOutlined } from '@ant-design/icons';
import { Button, Col, Form, Row, Typography, Upload } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useRecoilValue } from 'recoil';
import { accountState } from '../../State/AccountsState';
import { apiFormPost } from '../../Utils/api';

const { Title, Text } = Typography;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
};

interface FormValues {
  fileUploader: {
    file: Blob;
    fileList: UploadFile[];
  };
}

const UploadTransactionsForm = (): JSX.Element => {
  const [form] = Form.useForm();
  const [values, setValues] = useState<FormValues>({
    fileUploader: {
      file: new Blob(),
      fileList: [],
    },
  });
  const routeParams = useParams<'accountId'>();
  const account = useRecoilValue(accountState(Number(routeParams.accountId)));

  const onFinish = (values: FormValues) => {
    const formData = new FormData();
    formData.append('file', values.fileUploader.file);
    apiFormPost<void>(
      `/api/accounts/${routeParams.accountId}/uploads`,
      formData
    );
  };

  const disableUpload =
    values.fileUploader && values.fileUploader.fileList.length > 0;

  const disableSubmit =
    !values.fileUploader || values.fileUploader.fileList.length === 0;

  return (
    <div
      style={{
        marginTop: '-55px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <Row>
        <Col span={8} />
        <Col span={8} style={{ marginBottom: '1rem' }}>
          <Title style={{ marginBottom: '4px' }}>Upload Transactions</Title>
          <Text type='secondary'>{account?.name}</Text>
        </Col>
      </Row>
      <Form
        onFinish={onFinish}
        {...layout}
        form={form}
        onValuesChange={(updated, all) => {
          setValues(all);
        }}
      >
        <Form.Item
          name='fileUploader'
          valuePropName='fileList'
          getValueProps={(value) => value} // Prevent items.map() is not a function error
          required={true}
          wrapperCol={{
            offset: 8,
            span: 8,
          }}
        >
          <Upload
            name='file'
            accept='.csv'
            beforeUpload={() => false} // Prevent POSTing immediately
          >
            <Button disabled={disableUpload} icon={<UploadOutlined />}>
              Choose File
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type='primary' htmlType='submit' disabled={disableSubmit}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UploadTransactionsForm;
