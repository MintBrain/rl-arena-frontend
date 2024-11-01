import axios from "axios";
import { Form, Input, Button, Typography, Checkbox, Flex } from "antd";
import { useState } from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import type { FormProps } from "antd";

type FieldType = {
  email?: string;
  password?: string;
  remember?: boolean;
};


function Login() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFormFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setLoading(true);
    await axios.post("/login", values).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      setLoading(false);
    });
  };

  const onFormFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log("login form fail: ", errorInfo);
    setLoading(false);
  };


  return (
    <>
      <Form
        form={form}
        name="login"
        // labelCol={{ span: 8 }}
        // wrapperCol={{ span: 16 }}
        style={{ maxWidth: 360 }}
        // layout="horizontal"
        initialValues={{ remember: true, email: "test@email.ru", password: "testPassword" }}
        onFinish={onFormFinish}
        onFinishFailed={onFormFinishFailed}
      >
        <Typography.Title>Авторизация</Typography.Title>

        <Form.Item<FieldType> name="email" rules={[{ required: true, message: "Please input your email!" }]}>
          <Input prefix={<MailOutlined />} type="email" name="email" id="email" placeholder="User@example.com"
                 autoComplete="email" />
        </Form.Item>

        <Form.Item<FieldType> name="password" rules={[{ required: true, message: "Please input your password!" }]}>
          <Input.Password prefix={<LockOutlined />} type="password" name="password" id="password" placeholder="Password"
                          autoComplete="current-password" />
        </Form.Item>

        <Form.Item>
          <Flex justify="space-between" align="center">
            <Form.Item<FieldType> style={{ justifyContent: "space-between", alignContent: "center" }} name="remember"
                                  valuePropName="checked" noStyle>
              <Checkbox name="remember">Remember me</Checkbox>
            </Form.Item>
            <Link to="/restore">Forgot password</Link>
          </Flex>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default Login;