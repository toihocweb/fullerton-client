import React, { useState, useEffect } from "react";
import { Button, Modal, Input, Form } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useDispatch } from "react-redux";
import { changeStatus } from "../../actions/bookingAction";

const ApproveModal = ({ data }) => {
  const [visible, setVisible] = useState(true);
  const [times, setTimes] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setVisible(true);
    setTimes(data.times);
    return () => {};
  }, [data]);

  const handleCancel = (e) => {
    setVisible(false);
  };

  const handleOk = (e) => {
    setVisible(false);
    dispatch(changeStatus(data._id, times, "approve"));
  };

  const onFinish = (values) => {
    console.log(values);
  };

  const onFinishFailed = (errorInfo) => {};
  const handleTime = (time) => {
    if (times.indexOf(time) === -1) {
      setTimes([...times, time]);
    } else {
      setTimes(times.filter((val) => val !== time));
    }
  };

  return (
    <Modal
      title="Approve Modal"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Submit
        </Button>,
      ]}
    >
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item>
          {data.times.map((time, idx) => (
            <div style={{ display: "flex", marginBottom: 20 }} key={idx}>
              <Input disabled={times.includes(time)} value={time} />
              <Button onClick={() => handleTime(time)} type="primary">
                {times.includes(time) ? "Cancel" : "Confirm"}
              </Button>
            </div>
          ))}
        </Form.Item>
      </Form>
    </Modal>
  );
};

const RejectModal = ({ data }) => {
  const [visible, setVisible] = useState(false);
  const [form] = useForm();
  const dispatch = useDispatch();
  useEffect(() => {
    setVisible(true);
    return () => {};
  }, [data]);

  const handleCancel = (e) => {
    setVisible(false);
  };

  const handleOk = (e) => {
    form
      .validateFields()
      .then((values) => {
        if (values.reason) {
          dispatch(changeStatus(data._id, values.reason, "reject"));
          setVisible(false);
        }
      })
      .catch((info) => {});
  };

  const onFinish = (values) => {};

  const onFinishFailed = (errorInfo) => {};

  return (
    <Modal
      title="Reject Modal"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Submit
        </Button>,
      ]}
    >
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        form={form}
      >
        <Form.Item
          name="reason"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const CustomModal = ({ modal }) => {
  const data = { ...modal.data };
  if (modal.type === "approve") {
    return <ApproveModal data={data} />;
  }
  if (modal.type === "reject") {
    return <RejectModal data={data} />;
  }

  return null;
};

export default React.memo(CustomModal);
