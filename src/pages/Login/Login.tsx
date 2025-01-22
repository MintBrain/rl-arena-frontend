import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, Typography, Checkbox, message } from "antd";
import type { FormProps } from "antd";
import FormItemLabel from "../../components/FormItemLabel.tsx";
import api from "../../api/service.api.ts";
import { LoginRequest } from "../../types/api.ts";
import "../../styles/Form.css";
import { useCookies } from "react-cookie";

type FieldType = {
  username?: string;
  password?: string;
  remember?: boolean;
};

function Login() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [, setCookie] = useCookies(["access_token"]);

  const onFormFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setLoading(true);
    try {
      const response = await api.login(values as LoginRequest);

      if (response.status === 401) {
        message.error("Неверный логин или пароль");
      } else if (response.status !== 200) {
        message.error("Ошибка авторизации. Попробуйте еще.");
      } else {
        setCookie("access_token", response.data.access_token, { maxAge: values.remember ? 15552000 : 0 }); // NOTE: 15552000=180*24*60*60 - 180 days
        message.success("Успешный вход!");
        navigate("/");
      }
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
        className="form"
        layout="vertical"
        initialValues={{ remember: true, username: "username", password: "password" }}
        onFinish={onFormFinish}
        onFinishFailed={onFormFinishFailed}
        requiredMark={false}
      >
        <Typography.Title level={4} className="text-left text-textSecondary font-bold" style={{ marginBottom: 24 }}>
          Вход в систему
        </Typography.Title>

        <Form.Item<FieldType> className="my-0" label={<FormItemLabel text="Логин" />} name="username"
                              rules={[{ required: true, message: "Пожалуйста, введите логин!" },
                                {
                                  min: 4,
                                  message: "Логин должен быть не менее 4 символов"
                                },
                                {
                                  max: 32,
                                  message: "Логин должен быть не более 32 символов"
                                }]}>
          <Input className="form-input" type="text" name="username" id="username" placeholder="Введите логин"
                 autoComplete="username" />
        </Form.Item>

        <Form.Item<FieldType> style={{ marginTop: 24, marginBottom: 12 }} label={<FormItemLabel text="Пароль" />}
                              name="password"
                              rules={[{ required: true, message: "Пожалуйста, введите пароль!" },
                                {
                                  min: 8,
                                  message: "Пароль должен быть не менее 8 символов"
                                },
                                {
                                  max: 32,
                                  message: "Пароль должен быть не более 32 символов"
                                }]}>
          <Input.Password className="form-input" type="password" name="password" id="password"
                          placeholder="Введите пароль"
                          autoComplete="currentPassword" />
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

        <Form.Item className="flex justify-center mt-3 mb-0">
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


