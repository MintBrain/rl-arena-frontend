import { Form, Input, Button, Typography, Checkbox } from "antd";
import type { FormProps } from "antd";
import { useState } from "react";
import axios from "axios";

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

  const onFormClearClick = () => {
    form.resetFields();
  };


  return (
    <>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 400 }}
        layout="horizontal"
        initialValues={{ remember: true, email: "test@email.ru", password: "testPassword" }}
        onFinish={onFormFinish}
        onFinishFailed={onFormFinishFailed}
      >
        <Typography.Title>Авторизация</Typography.Title>

        <Form.Item<FieldType> label="Email" name="email"
                              rules={[{ required: true, message: "Please input your email!" }]}>
          <Input type="email" name="email" id="email" placeholder="User@example.com"
                 autoComplete="email" />
        </Form.Item>

        <Form.Item<FieldType> label="Password" name="password"
                              rules={[{ required: true, message: "Please input your password!" }]}>
          <Input.Password type="password" name="password" id="password" placeholder="Password"
                          autoComplete="current-password" />
        </Form.Item>

        <Form.Item<FieldType> name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox name="remember">Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Login
          </Button>
          <Button htmlType="button" onClick={onFormClearClick}>
            Clear
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default Login;