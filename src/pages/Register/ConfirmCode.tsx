import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Typography, Space, FormProps, message, InputNumber } from "antd";
import FormItemLabel from "../../components/FormItemLabel.tsx";
import "../../styles/Form.css";
import api from "../../api/service.api.ts";

interface Props {
  email: string;
  onReturn: () => void;
}

type FieldType = {
  verificationCode?: number;
}

const ConfirmCode: React.FC<Props> = ({ email, onReturn }) => {
  const defaultTime = 10;
  const [form] = Form.useForm<FieldType>();
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(defaultTime);
  const navigate = useNavigate();

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
      const response = await api.resendRegistrationCode({ email });
      if (response.status !== 200) {
        message.error("Ошибка отправки кода подтверждения!");
        setTime(10);
      } else {
        message.success("Код успешно отправлен на " + email + "!");
      }
    } catch (error) {
      console.error(error);
      message.error("Ошибка отправки кода подтверждения!");
    } finally {
      setLoading(false);
    }
  };

  const onFormFinish: FormProps<FieldType>["onFinish"] = async ({ verificationCode }) => {
    setLoading(true);
    try {
      const response = await api.checkRegistrationCode({ email, verificationCode: verificationCode! });
      if (response.status !== 200) {
        form.setFields([{ name: "verificationCode", errors: ["Неверный код подтверждения!"] }]);
      } else {
        message.success("Успешная регистрация!");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      message.error("Ошибка проверки кода подтверждения. Попробуйте ещё.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form
        form={form}
        name="basic"
        className="form"
        layout="vertical"
        onFinish={onFormFinish}
        validateTrigger="onSubmit"
      >
        <Typography.Title level={4} className="text-left mt-0 text-textSecondary font-bold"
                          style={{ marginBottom: 24 }}>
          Подтверждение аккаунта
        </Typography.Title>

        <Form.Item className="my-0" label={<FormItemLabel text="Код" />}>
          <Space className="w-full" align={"center"}> {/*TODO: Авторастягивание по ширине */}
            <Form.Item<FieldType> name="verificationCode"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Введите проверочный код"
                                    },
                                    () => ({
                                        validator(_, value) {
                                          if (!value || value.toString().length === 6) {
                                            return Promise.resolve();
                                          }
                                          return Promise.reject(new Error("Код должен быть 6 цифр"));
                                        }
                                      }
                                    )]}
                                  noStyle>
              <InputNumber controls={false} style={{ width: 240 }} name="verificationCode" id="verificationCode"
                           autoComplete="oneTimeCode" placeholder="123456" min={0} maxLength={6} />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} className="w-full bg-accentColor"
                    style={{ width: 130 }}>
              Подтвердить
            </Button>
          </Space>
        </Form.Item>

        <Form.Item className="mt-2.5 mb-0">
          <Typography.Text>Введите код подтверждения, отправленный на {email}</Typography.Text>
        </Form.Item>

        <Form.Item className="my-6 ">
          {time > 0 ?
            <Typography.Text>Вы можете запросить код повторно через {time} секунд</Typography.Text> :
            <Button type="primary" className="bg-accentColor" htmlType="button" onClick={handleResendCode}
                    disabled={loading}>Отправить код повторно</Button>}
        </Form.Item>

        <Form.Item className="my-0">
          <Button type="primary" htmlType="button" className="w-full bg-second text-text" onClick={onReturn}
                  disabled={loading}>Вернуться обратно</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ConfirmCode;
