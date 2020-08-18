import React, { useState, useEffect } from "react";
import { Form, Input, Button } from "antd";
import {
  LoginOutlined,
  UserOutlined,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { registerAction, clearError } from "../../actions/authAction";
import { useForm } from "antd/lib/form/Form";
import { Link } from "react-router-dom";

const Register = ({ history }) => {
  const [form] = useForm();

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const error = useSelector((state) => state.errorReducer.error);

  useEffect(() => {
    dispatch(clearError());

    if (error) {
      const fieldErr = error.field;
      setLoading(false);
      form.setFields([
        {
          name: fieldErr,
          errors: [error[fieldErr]],
        },
      ]);
    }
    return () => {};
  }, [error]);

  const onFinish = (values) => {
    setLoading(true);
    dispatch(registerAction(values, history));
  };

  const onFinishFailed = (errorInfo) => {};

  return (
    <div className="wrapper">
      <Form
        form={form}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        style={{
          width: 500,
          boxShadow: "0 3px 12px 0 #9e6c0e",
          padding: 30,
          background: "white",
          borderRadius: 7,
          position: "relative",
          zIndex: 1,
        }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: "Please input your name!" },
            {
              min: 2,
              max: 30,
              message: "Name must be between 2 and 30 characters!",
            },
          ]}
        >
          <Input placeholder="Name" size="large" prefix={<UserOutlined />} />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input placeholder="Email" size="large" prefix={<MailOutlined />} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please input your password!" },
            {
              min: 6,
              message: "Password must be at least 6 characters",
            },
          ]}
        >
          <Input.Password
            placeholder="Password"
            size="large"
            prefix={<LockOutlined />}
          />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="password2"
          rules={[
            {
              required: true,
              message: "Please input your confirm password!",
            },
            {
              min: 6,
              message: "Password must be at least 6 characters",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  "The two passwords that you entered do not match!"
                );
              },
            }),
          ]}
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined />}
            placeholder="Confirm Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            size="large"
            style={{ width: "100%" }}
            type="primary"
            htmlType="submit"
            icon={<LoginOutlined />}
            loading={loading ? true : false}
          >
            Register
          </Button>
        </Form.Item>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Link to="/login">I have an account</Link>
        </div>
      </Form>
    </div>
  );
};

export default Register;
