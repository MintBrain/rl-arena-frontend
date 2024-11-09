import React, { useEffect, useState } from "react";
import { Button, Form, FormProps, Input, message, Typography } from "antd";
import { NextButton, ReturnLink } from "./Misc.tsx";
import { StepFormProps } from "./RestorePassword.tsx";
import FormItemLabel from "../../components/FormItemLabel.tsx";
import axios from "axios";

export type FieldType = {
  restoreCode: string;
}

const CodeForm: React.FC<StepFormProps> = ({ email, formProps, nextStep, onReturnClick }) => {
  const defaultTime = 10;
  const [form] = Form.useForm();
  const [time, setTime] = useState(defaultTime);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timerId = setInterval(() => setTime((prev) => prev - 1), 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  const handleResendCode = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setTime(defaultTime);
    setLoading(true);
    try {
      const response = await axios.post("https://httpbin.org/post", { withCredentials: true });
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      message.success("Код успешно отправлен на " + email + "!");
    } catch (error) {
      console.error(error);
      message.error("Ошибка отправки кода подтверждения!");
    } finally {
      setLoading(false);
    }
  };

  const onCodeFinish: FormProps<FieldType>["onFinish"] = async ({ restoreCode }) => {
    setLoading(true);
    try {
      const response = await axios.post("https://httpbin.org/post", restoreCode, { withCredentials: true });
      if (response.status === 400) {

        form.setFields([{ name: "restoreCode", errors: ["Код неверен"] }]);
      } else if (response.status !== 200) {
        throw new Error(response.statusText);
      } else {
        nextStep!();
      }
    } catch (error) {
      console.error(error);
      message.error("Ошибка подтверждения кода");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      {...formProps}
      form={form}
      onFinish={onCodeFinish}
    >
      <Form.Item className="mt-0" style={{ marginBottom: 24 }}>
        <Typography.Text className="text-base" style={{ color: "rgba(60, 60, 67, 0.64)" }}>
          Введите код из письма, отправленного на почту {email}. Если не обнаружили письмо, то проверьте раздел
          “Спам”.
        </Typography.Text>
      </Form.Item>

      <Form.Item<FieldType> name="restoreCode" className="my-0 w-full" label={<FormItemLabel text="Код" />}
                            rules={[{ required: true, message: "Введите проверочный код" },
                              { len: 6, message: "Код должен быть 6 цифр" }]}>
        <Input type="text" name="restoreCode" id="restoreCode" autoComplete="oneTimeCode" placeholder="123456" />
      </Form.Item>

      <Form.Item className="my-6 " style={{ marginTop: 12, marginBottom: 24 }}>
        {time > 0 ?
          <Typography.Text>Вы можете запросить код повторно через {time} секунд</Typography.Text> :
          <Button type="primary" className="bg-accentColor" htmlType="button" onClick={handleResendCode}
                  loading={loading}>Отправить код повторно</Button>}
      </Form.Item>

      <NextButton text="Продолжить" loading={loading} />
      <ReturnLink text="Вернуться на экран ввода почты" onClick={onReturnClick!} />
    </Form>
  );
};

export default CodeForm;