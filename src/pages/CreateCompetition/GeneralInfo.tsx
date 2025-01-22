import React from "react";
import { Dayjs } from "dayjs";
import { Form, Radio, Input, DatePicker, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import FormItemLabel from "../../components/FormItemLabel.tsx";
import { BeforeUploadParamsType } from "../../types/antdBased.tsx";


export type GeneralInfoFieldType = {
  name: string;
  subtitle: string;
  url: string;
  competitionType: string;
  startDate: Dayjs;
  endDate: Dayjs;
  backgroundImage?: BeforeUploadParamsType;
};

const GeneralInfo: React.FC = () => {

  const validateUrlSegment = (_: any, value: string) => {
    // Check if the segment is valid
    const isValidSegment = /^[a-zA-Z0-9-_]+$/.test(value); // Allows letters, numbers, hyphens, underscores

    if (!value) {
      return Promise.resolve();
    }
    if (value.length < 6) {
      return Promise.reject(
        new Error("Часть URL-адреса должна содержать минимум 6 символов")
      );
    }
    if (value.length > 32) {
      return Promise.reject(
        new Error("Часть URL-адреса должна содержать максимум 32 символа")
      );
    }
    if (!isValidSegment) {
      return Promise.reject(
        new Error("Часть URL-адреса может содержать только буквы, цифры, -, _")
      );
    }
    return Promise.resolve();
  };

  return (
    <>
      <Form.Item<GeneralInfoFieldType>
        label={<FormItemLabel text="Название" />}
        name="name"
        rules={[{ required: true, message: "Введите название соревнования" }]}
      >
        <Input placeholder="Введите название соревнования" />
      </Form.Item>

      <Form.Item<GeneralInfoFieldType>
        label={<FormItemLabel text="Подзаголовок" />}
        name="subtitle"
        rules={[
          { required: true, message: "Введите подзаголовок соревнования" },
          { max: 120, message: "Подзаголовок не должен превышать 120 символов" }
        ]}
      >
        <Input.TextArea
          placeholder="Введите подзаголовок соревнования"
          rows={2}
        />
      </Form.Item>

      <Form.Item<GeneralInfoFieldType>
        label={<FormItemLabel text="URL-адрес соревнования" />}
        name="url"
        rules={[
          { required: true, message: "Введите URL-адрес соревнования" },
          { validator: validateUrlSegment }
        ]}
      >
        <Input
          addonBefore="example.com/competitions/"
          placeholder="Введите URL-адрес"
        />
      </Form.Item>

      <Form.Item<GeneralInfoFieldType>
        label={<FormItemLabel text="Тип соревнования" />}
        name="competitionType"
        rules={[{ required: true, message: "Выберите тип соревнования" }]}
      >
        <Radio.Group>
          <Radio value="RL">RL</Radio>
          <Radio value="ML">ML</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item<GeneralInfoFieldType>
        label={<FormItemLabel text="Дата начала соревнования" />}
        name="startDate"
        rules={[
          { required: true, message: "Выберите дату начала соревнования" }
        ]}
      >
        <DatePicker
          showTime
          format="YYYY-MM-DD HH:mm"
          placeholder="Выберите дату и время"
        />
      </Form.Item>

      <Form.Item<GeneralInfoFieldType>
        label={<FormItemLabel text="Дата окончания соревнования" />}
        name="endDate"
        rules={[
          { required: true, message: "Выберите дату окончания соревнования" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              const startDate = getFieldValue("startDate");
              if (!value || (startDate && value.isAfter(startDate))) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("Дата окончания должна быть после даты начала")
              );
            }
          })
        ]}
      >
        <DatePicker
          showTime
          format="YYYY-MM-DD HH:mm"
          placeholder="Выберите дату и время"
        />
      </Form.Item>

      <Form.Item<GeneralInfoFieldType>
        label={<FormItemLabel text="Фоновое изображение" />}
        name="backgroundImage"
        valuePropName="file"
        rules={[
          { required: false, message: "Загрузите фоновое изображение" }
        ]}
      >
        <Upload
          maxCount={1}
          beforeUpload={() => false} // Prevent automatic upload
          accept=".jpg,.png"
        >
          <Button icon={<UploadOutlined />}>Загрузить изображение</Button>
        </Upload>
      </Form.Item>
    </>
  );
};

export default GeneralInfo;