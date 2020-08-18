import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  Tag,
  Space,
  Button,
  Modal,
  Input,
  Select,
  DatePicker,
} from "antd";
import Form, { useForm } from "antd/lib/form/Form";
import {
  MinusCircleOutlined,
  PlusOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getTypes,
  getBookings,
  addBooking,
  cancelBooking,
} from "../../actions/bookingAction";
import CustomModal from "../CustomModal/CustomModal";

const { Option } = Select;

const Dashboard = () => {
  const [visible, setVisible] = useState(false);
  const [modal, setModal] = useState({ type: "", data: null });
  const [form] = useForm();
  const dispatch = useDispatch();
  const types = useSelector((state) => state.typeReducer.types);
  const bookings = useSelector((state) => state.bookingReducer.bookings);
  const isLoading = useSelector((state) => state.bookingReducer.isLoading);
  const currentUser = useSelector((state) => state.authReducer.currentUser);
  const isAdmin = useSelector((state) => state.authReducer.isAdmin);
  const cancelRef = useRef(null);
  const { confirm } = Modal;
  const columns = [
    {
      title: "Type",
      dataIndex: "booking_type",
      key: "booking_type",
      render: (type) => {
        return type.name;
      },
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Time",
      dataIndex: "times",
      key: "times",
      render: (times) => (
        <>
          {times.map((time, idx) => (
            <Tag key={idx}>{time}</Tag>
          ))}
        </>
      ),
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (status) => {
        let color;
        if (status === "rejected") {
          color = "volcano";
        }
        if (status === "approved") {
          color = "green";
        }
        if (status === "pending") {
          color = "geekblue";
        }
        return (
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => renderAction(record),
    },
  ];

  const renderAction = (record) => {
    if (isAdmin) {
      if (record.status === "pending") {
        return (
          <Space size="middle">
            <a className="approve">Approve</a>
            <a className="reject">Reject</a>
          </Space>
        );
      }
    } else {
      if (record.status === "pending") {
        return (
          <Space size="middle">
            <a className="cancel">Cancel</a>
          </Space>
        );
      }
    }
  };

  useEffect(() => {
    dispatch(getTypes());
    dispatch(getBookings());
    return () => {};
  }, []);

  const showModal = () => {
    setVisible(true);
  };

  const checkClick = (record, event) => {
    // click cancel button
    if (event.target.classList.contains("cancel")) {
      //TODO: render cancel modal
      confirm({
        title: "Are you sure cancel this booking?",
        icon: <ExclamationCircleOutlined />,
        content: "This booking will be deleted from DB",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk() {
          dispatch(cancelBooking(record._id));
        },
        onCancel() {},
      });
    }
    // click approve button
    if (event.target.classList.contains("approve")) {
      //TODO: render approve modal
      setModal({ type: "approve", data: record });
    }
    // click reject button
    if (event.target.classList.contains("reject")) {
      //TODO: render reject modal
      setModal({ type: "reject", data: record });
    }
  };

  const handleOk = (e) => {
    form
      .validateFields()
      .then((values) => {
        const timeFormated = values.times
          ? values.times.map((val) => {
              return val.format("MMMM Do YYYY, h:mm:ss a");
            })
          : [];

        const booking = {
          ...values,
          times: [
            values.default_time.format("MMMM Do YYYY, h:mm:ss a"),
            ...timeFormated,
          ],
          user: currentUser.id,
        };
        dispatch(addBooking(booking));

        setTimeout(() => {
          setVisible(false);
          form.resetFields();
        }, 1200);
      })
      .catch((info) => {});
  };

  const handleCancel = (e) => {
    setVisible(false);
    form.resetFields();
  };

  const onFinish = (values) => {};

  const onFinishFailed = (errorInfo) => {};

  const onChange = (value, dateString) => {};

  const onOk = (value) => {};

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: 20,
        }}
      >
        <Button onClick={showModal} type="primary">
          Add New Booking
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={bookings}
        rowKey="_id"
        loading={isLoading ? true : false}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              checkClick(record, event);
            },
          };
        }}
      />
      <CustomModal modal={modal} />
      <Modal
        title="Add New Booking"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={isLoading}
            onClick={handleOk}
          >
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
          <Form.Item name="booking_type" rules={[{ required: true }]}>
            <Select placeholder="Select your event type" allowClear>
              {types &&
                types.map((val) => (
                  <Option key={val._id} value={val._id}>
                    {val.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item name="location" rules={[{ required: true }]}>
            <Input.TextArea placeholder="Location" />
          </Form.Item>
          <Form.Item rules={[{ required: true }]} name="default_time">
            <DatePicker
              name="newtime"
              showTime
              onChange={onChange}
              onOk={onOk}
              placeholder="Proposed time"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.List name="times">
            {(fields, { add, remove }) => {
              return (
                <div>
                  {fields.map((field, index) => (
                    <Form.Item key={field.key}>
                      <Form.Item
                        {...field}
                        validateTrigger={["onChange", "onBlur"]}
                        noStyle
                        rules={[{ required: true }]}
                      >
                        <DatePicker
                          style={
                            fields.length >= 1
                              ? { width: "calc(100% - 30px)" }
                              : { width: "100%" }
                          }
                          name="newtime"
                          showTime
                          onChange={onChange}
                          onOk={onOk}
                          placeholder="Proposed time"
                        />
                      </Form.Item>

                      {fields.length >= 1 ? (
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          style={{
                            top: 8,
                            position: "absolute",
                            transform: "translateX(10px)",
                          }}
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      ) : null}
                    </Form.Item>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => {
                        add();
                      }}
                      style={{ width: "100%" }}
                    >
                      <PlusOutlined /> Add proposed time
                    </Button>
                  </Form.Item>
                </div>
              );
            }}
          </Form.List>
        </Form>
      </Modal>
    </div>
  );
};

export default Dashboard;
