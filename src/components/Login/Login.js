import React, { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { loginAction, clearError } from "../../actions/authAction";
import { useForm } from "antd/lib/form/Form";
import { LoginOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Login = ({ history }) => {
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
    dispatch(loginAction(values, history));
  };

  const onFinishFailed = (errorInfo) => {};

  return (
    <div className="wrapper">
      <Form
        name="basic"
        form={form}
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
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input prefix={<UserOutlined />} size="large" placeholder="Email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined />}
            placeholder="Password"
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
            Login
          </Button>
        </Form.Item>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Link to="/register">Don't have an account</Link>
        </div>
      </Form>
    </div>
  );
};

export default Login;
