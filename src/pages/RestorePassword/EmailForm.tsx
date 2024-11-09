import React, { useState } from "react";
import { Form, FormProps, Input, message, Typography } from "antd";
import { NextButton, ReturnLink } from "./Misc.tsx";
import FormItemLabel from "../../components/FormItemLabel.tsx";
import { StepFormProps } from "./RestorePassword.tsx";
import axios from "axios";

export type FieldType = {
  email: string;
}

const EmailForm: React.FC<StepFormProps> = ({ email, formProps, nextStep, onReturnClick }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onEmailFinish: FormProps<FieldType>["onFinish"] = async ({ email }) => {
    setLoading(true);
    try {
      const response = await axios.post("https://httpbin.org/post", email, { withCredentials: true });

      if (response.status === 201) {
        form.setFields([{ name: "email", errors: ["Указанная почта не зарегистрирована в системе."] }]);
      } else if (response.status !== 200) {
        throw new Error(response.statusText);
      } else {
        nextStep!();
      }
    } catch (error) {
      console.error(error);
      message.error("Ошибка восстановления пароля");
    } finally {
      setLoading(false);
    }
  };


  return (
    <Form
      {...formProps}
      form={form}
      initialValues={{ email: email }}
      onFinish={onEmailFinish}
    >
      <Form.Item className="mt-0" style={{ marginBottom: 24 }}>
        <Typography.Text className="text-base" style={{ color: "rgba(60, 60, 67, 0.64)" }}>
          Введите почту, которую вы указывали при
          регистрации аккаунта. Мы вышлем на нее
          дальнейшие инструкции по восстановлению
          пароля.
        </Typography.Text>
      </Form.Item>

      <Form.Item<FieldType> name="email"
                            className="my-0 w-full" label={<FormItemLabel text="E-mail" />}
                            rules={[
                              {
                                type: "email",
                                message: "Введите корректную почту"
                              },
                              {
                                required: true,
                                message: "Введите вашу почту!"
                              }
                            ]}>
        <Input className="form-input" type="email" name="email" id="email" autoComplete="email"
               placeholder="Введите почту" />
      </Form.Item>

      <NextButton text="Продолжить" loading={loading} />
      <ReturnLink text="Вернуться на экран входа" onClick={onReturnClick!} />
    </Form>
  );
};

export default EmailForm;