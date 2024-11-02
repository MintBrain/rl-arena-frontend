import axios from "axios";
import { Form, Input, Button, Typography, Checkbox, message } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { FormProps } from "antd";
import "./Login.css";

type FieldType = {
  username?: string;
  password?: string;
  remember?: boolean;
};


function Login() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFormFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post("https://httpbin.org/post", values, { withCredentials: true });
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      message.success("Успешный вход!");
      navigate("/");
    } catch (error) {
      console.error(error);
      message.error("Ошибка входа");
    } finally {
      setLoading(false);
    }
  };

  const onFormFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log("login form fail: ", errorInfo);
    setLoading(false);
  };


  return (
    <div className="form-container">
      <Form
        form={form}
        name="login"
        size="middle"
        className="form-login"
        initialValues={{ remember: true, username: "nickName", password: "testPassword" }}
        onFinish={onFormFinish}
        onFinishFailed={onFormFinishFailed}
      >

        <Typography.Title level={4} className="text-left mb-5 text-textSecondary font-bold">Вход в
          систему</Typography.Title>

        <Form.Item className="my-6">
          <Typography.Text className="font-bold">Логин</Typography.Text>
          <Form.Item<FieldType> name="username" rules={[{required: true, message: "Пожалуйста, введите логин!" }]}
                                noStyle>
            <Input className="form-input" type="text" name="username" id="username" placeholder="Введите логин"
                   autoComplete="username" />
          </Form.Item>
        </Form.Item>

        <Form.Item className="mt-6 mb-3">
          <Typography.Text className="font-bold">Пароль</Typography.Text>
          <Form.Item<FieldType> name="password" rules={[{ required: true, message: "Пожалуйста, введите пароль!" }]}
                                noStyle>
            <Input.Password className="form-input" type="password" name="password" id="password"
                            placeholder="Введите пароль"
                            autoComplete="current-password" /></Form.Item>
        </Form.Item>
        <Form.Item<FieldType> name="remember"
                              valuePropName="checked" noStyle>
          <Checkbox name="remember">Запомнить меня</Checkbox>
        </Form.Item>

        <Form.Item className="my-6">
          <Button className="w-full rounded-lg bg-accentColor" type="primary" htmlType="submit" loading={loading}>
            Войти
          </Button>
        </Form.Item>

        <Form.Item className="block text-center text-accentColor mb-0">
          <Link to="/restore">Забыли пароль?</Link>
        </Form.Item>

        <Form.Item className="flex justify-center my-0">
          <Typography.Text>
            Нет аккаунта?
          </Typography.Text>
          <Link to="/register" className="text-accentColor ml-2">Зарегистрироваться </Link>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;


