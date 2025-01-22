import React, { useState } from "react";
import { FormProps, message, Typography } from "antd";
import {
  Button,
  Checkbox,
  Form,
  Input
} from "antd";
import { Link } from "react-router-dom";
import FormItemLabel from "../../components/FormItemLabel.tsx";
import "../../styles/Form.css";
import ConfirmCode from "./ConfirmCode.tsx";
import api from "../../api/service.api.ts";
import { RegisterRequest } from "../../types/api.ts";

type FieldType = {
  username?: string;
  email?: string;
  password?: string;
  agreement?: boolean;
};

const Register: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm<FieldType>();
  const [codePage, setCodePage] = useState(false);


  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setLoading(true);
    try {
      const response = await api.register(values as RegisterRequest);

      if (response.status === 400) {
        message.error("Почта или имя пользователя уже заняты");
      } else if (response.status !== 200) {
        message.error("Ошибка регистрации. Попробуйте еще.");
      } else {
        setCodePage(true);
      }
    } catch (error) {
      console.error(error);
      message.error("Ошибка регистрации");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="form-container">
      {codePage ? (<ConfirmCode onReturn={() => setCodePage(false)} email={form.getFieldValue("email")} />) :
        <Form
          form={form}
          name="register"
          className="form"
          layout="vertical"
          initialValues={{
            agreement: true,
            username: "username",
            email: "1@1.ru",
            password: "password",
            confirmPassword: "password"
          }}
          onFinish={onFinish}
          scrollToFirstError
          validateTrigger="onSubmit"
          requiredMark={false}
        >
          <Typography.Title level={4} className="text-left text-textSecondary font-bold" style={{ marginBottom: 24 }}>
            Регистрация
          </Typography.Title>

          <Form.Item<FieldType> label={<FormItemLabel text="Логин" />} name="username" rules={[
            {
              required: true,
              message: "Введите ваш логин!"
            },
            {
              min: 4,
              message: "Логин должен быть не менее 4 символов"
            },
            {
              max: 32,
              message: "Логин должен быть не более 32 символов"
            }
          ]}>
            <Input className="form-input" type="text" name="username" id="username"
                   placeholder="Введите логин" autoComplete="username" />
          </Form.Item>

          <Form.Item<FieldType> label={<FormItemLabel text="E-mail" />}
                                name="email"
                                rules={[
                                  {
                                    type: "email",
                                    message: "The input is not valid E-mail!"
                                  },
                                  {
                                    required: true,
                                    message: "Пожалуйста, введите электронную почту!"
                                  }
                                ]}>
            <Input className="form-input" type="email" name="email" id="emil"
                   placeholder="Введите электронную почту" autoComplete="email" />
          </Form.Item>

          <Form.Item<FieldType>
            label={<FormItemLabel text="Пароль" />}
            name="password"
            rules={[
              {
                required: true,
                message: "Пожалуйста, введите пароль!"
              },
              {
                min: 8,
                message: "Пароль должен быть не менее 8 символов"
              },
              {
                max: 32,
                message: "Пароль должен быть не более 32 символов"
              }
            ]}
            hasFeedback
          >
            <Input.Password className="form-input" type="password" name="password" id="password"
                            placeholder="Введите пароль"
                            autoComplete="newPassword" />
          </Form.Item>

          <Form.Item
            label={<FormItemLabel text="Повторите пароль" />}
            name="confirmPassword"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Пожалуйста, повторите пароль!"
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Пароли не совпадают!"));
                }
              })
            ]}
          >
            <Input.Password className="form-input" type="password" name="password" id="confirmPassword"
                            placeholder="Повторите пароль"
                            autoComplete="newPassword" />
          </Form.Item>

          <Form.Item<FieldType>
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error("Вы должны принять пользовательское соглашение!"))
              }
            ]}
          >
            <Checkbox name="agreement" className="select-none">
              Я принимаю условия <Link to="/agreement" className="text-accentColor">пользовательского соглашения</Link>
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} className="w-full bg-accentColor">
              Продолжить
            </Button>
          </Form.Item>

          <Form.Item className="flex justify-center my-0">
            <Typography.Text>
              Уже есть аккаунт?
            </Typography.Text>
            <Link to="/login" className="text-accentColor ml-2">Войти </Link>
          </Form.Item>

        </Form>}
    </div>
  );
};

export default Register;