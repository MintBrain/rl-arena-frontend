import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormProps, Input, message } from "antd";
import { NextButton } from "./Misc.tsx";
import { StepFormProps } from "./RestorePassword.tsx";
import FormItemLabel from "../../components/FormItemLabel.tsx";
import axios from "axios";

export type FieldType = {
  password: string;
}

const NewPasswordForm: React.FC<StepFormProps> = ({ formProps }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onNewPasswordFinish: FormProps<FieldType>["onFinish"] = async ({ password }) => {
    setLoading(true);
    try {
      const response = await axios.post("https://httpbin.org/post", password, { withCredentials: true });
      if (response.status !== 200) {
        throw new Error(response.statusText);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      message.error("Ошибка смены пароля");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      {...formProps}
      onFinish={onNewPasswordFinish}
    >
      <Form.Item<FieldType>
        label={<FormItemLabel text="Новый пароль" />}
        name="password"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите новый пароль!"
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
        style={{ marginTop: 24 }}
        hasFeedback
      >
        <Input.Password className="form-input" type="password" name="password" id="password"
                        placeholder="Введите пароль"
                        autoComplete="newPassword" />
      </Form.Item>

      <Form.Item
        label={<FormItemLabel text="Повторите новый пароль" />}
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
        <Input.Password className="form-input" type="password" name="password" id="password"
                        placeholder="Повторите пароль"
                        autoComplete="newPassword" />
      </Form.Item>

      <NextButton style={{ marginTop: 32, marginBottom: 0 }} text="Сменить пароль" loading={loading} />
    </Form>
  );
};

export default NewPasswordForm;