import { UploadOutlined } from '@ant-design/icons';
import { Alert, Button, Form, Modal, Spin, Upload } from 'antd';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { setTransactionUploadIdFilter } from '../../Redux/Filters/reducer';
import { resetRequest } from '../../Redux/Requests/actions';
import { createLoadingSelector, selectRequestStatus } from '../../Redux/Requests/selectors';
import { requestCreateUpload } from '../../Redux/Uploads/actions';
import UploadConstants from '../../Redux/Uploads/constants';

function CreateUploadForm(props) {

  const { accountId, isVisible, onCancel, onOk } = props;

  const dispatch = useDispatch();
  const history = useHistory();
  const [form] = Form.useForm();
  const [values, setValues] = useState({});
  const isSubmitting = useSelector(createLoadingSelector([UploadConstants.CREATE_UPLOAD]));
  const requestErrors = useSelector(state => selectRequestStatus(state, UploadConstants.CREATE_UPLOAD)).errors;

  const onSubmit = async() => {
    form.validateFields().then(async(values) => {
      dispatch(requestCreateUpload({ accountId: accountId, file: values.fileUploader.file })).then(request => {
        if (!request.error) {
          onOk();
          form.resetFields();
          dispatch(setTransactionUploadIdFilter(request.payload.id));
          history.push('/transactions/table');
        }
      });
    }).catch(() => {
      // Handle form validation errors
    });
  };

  const disableUpload = (values.fileUploader && values.fileUploader.fileList.length > 0);

  return (
    <Modal
      visible={isVisible}
      title='Upload Transactions'
      okText='Submit'
      cancelText='Cancel'
      onCancel={onCancel}
      onOk={onSubmit}
    >
      { isSubmitting ?
        <Spin />
        :
        <Form
          form={form}
          onValuesChange={(updated, all) => {
            setValues(all);
            dispatch(resetRequest(UploadConstants.CREATE_UPLOAD));
          }}
        >
          <Form.Item
            name='fileUploader'
            valuePropName='fileList'
            getValueProps={(value) => value} // Prevent items.map() is not a function error
            required={true}
          >
            <Upload
              name='file'
              accept='.csv'
              beforeUpload={() => false} // Prevent POSTing immediately
            >
              <Button disabled={disableUpload} icon={<UploadOutlined />}>Choose File</Button>
            </Upload>
          </Form.Item>
        </Form>

      }
      { requestErrors.map((error, idx) => (
        <Alert
          key={idx}
          message='Error'
          description={error}
          type='error'
          showIcon
        />
      ))}
    </Modal>
  );
}

CreateUploadForm.propTypes = {
  accountId: PropTypes.number.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired
};

export default CreateUploadForm;