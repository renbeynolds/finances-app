import { Col, Row } from 'antd';
import React from 'react';
import { useParams } from 'react-router';
import { TransactionTable } from '../../Transactions/TransactionTable';

const UploadViewer = (): JSX.Element => {
  const { uploadId: uploadIdString } = useParams();
  const uploadId = parseInt(uploadIdString!);

  return (
    <Row>
      <Col span={24}>
        <TransactionTable uploadId={uploadId} />
      </Col>
    </Row>
  );
};

export default UploadViewer;
