import { Form, Input } from 'antd';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import './styles.scss';

function EditableCell(props) {

    const { dataIndex, title, value, onSave, formatValue } = props;

    const [form] = Form.useForm();
    const [editing, setEditing] = useState(false);

    const save = async () => {
        const values = await form.validateFields();
        onSave(values[dataIndex]);
        setEditing(!editing);
    };

    if (editing) {
        return (
            <Form
                form={form}
                initialValues={{
                    [dataIndex]: value
                }}
            >
                <Form.Item
                    style={{ margin: 0 }}
                    name={dataIndex}
                    rules={[
                        {
                            required: true,
                            message: `${title} is required.`,
                        },
                    ]}
                >
                    <Input
                        onPressEnter={save} onBlur={save}
                        style={{ maxWidth: '250px' }}
                    />
                </Form.Item>
            </Form>
        );
    } else {
        return (
            <div
                className='EditableCell__not-editing'
                onClick={() => setEditing(!editing)}
            >
                {formatValue ? formatValue(value) : value}
            </div>
        );
    }

}

EditableCell.propTypes = {
    dataIndex: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    onSave: PropTypes.func.isRequired,
    formatValue: PropTypes.func
}

export default EditableCell;