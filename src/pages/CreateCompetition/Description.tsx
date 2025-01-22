import React from "react";
import { Form, Input, Upload, Button, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import FormItemLabel from "../../components/FormItemLabel.tsx";
import { BeforeUploadParamsType } from "../../types/antdBased.tsx";

export type DescriptionFieldType = {
  shortDescription: string;
  detailedDescription: string;
  goals: string;
  rules: string;
  prizeAmount: number;
  prizeInfo?: string;
  documentation?: BeforeUploadParamsType;
  tags: string[];
}


const Description: React.FC = () => {
  return (
    <>
      {/* Описание соревнования */}
      <Form.Item<DescriptionFieldType>
        label={<FormItemLabel text="Краткое описание соревнования" />}
        name="shortDescription"
        rules={[
          {
            required: true,
            message: "Введите краткое описание соревнования"
          },
          { min: 10, message: "Краткое описание должно быть не менее 10 символов" },
          { max: 100, message: "Краткое описание должно быть не более 100 символов" },
        ]}
      >
        <Input.TextArea
          placeholder="Введите краткое описание соревнования"
          rows={4}
        />
      </Form.Item>

      {/* Подробное описание */}
      <Form.Item<DescriptionFieldType>
        label={<FormItemLabel text="Подробное описание" />}
        name="detailedDescription"
        rules={[
          {
            required: true,
            message: "Введите подробное описание"
          },
          // { min: 10, message: "Подробное описание должно быть не менее 10 символов" },
          { max: 5000, message: "Подробное описание должно быть не более 5000 символов" },
        ]}
      >
        <Input.TextArea
          placeholder="Введите подробное описание"
          rows={6}
        />
      </Form.Item>

      {/* Цели */}
      <Form.Item<DescriptionFieldType>
        label={<FormItemLabel text="Цели" />}
        name="goals"
        rules={[
          {
            required: true,
            message: "Введите цели соревнования"
          },
          { max: 1000, message: "Цели соревнования должны быть не более 1000 символов" },
        ]}
      >
        <Input.TextArea placeholder="Введите цели соревнования" rows={3} />
      </Form.Item>

      {/* Правила */}
      <Form.Item<DescriptionFieldType>
        label={<FormItemLabel text="Правила" />}
        name="rules"
        rules={[
          {
            required: true,
            message: "Введите правила соревнования"
          },
          { max: 1000, message: "Правила соревнования должны быть не более 1000 символов" },
        ]}
      >
        <Input.TextArea placeholder="Введите правила соревнования" rows={4} />
      </Form.Item>

      <Form.Item<DescriptionFieldType>
        label={<FormItemLabel text="Призовой фонд" />}
        name="prizeAmount"
        rules={[
          {
            required: true,
            message: "Введите сумму призового фонда",
          },
          // {
          //   type: "number",
          //   min: 0,
          //   max: 1000000, // Example maximum amount
          //   transform: (value) => (value ? Number(value) : NaN),
          //   message: "Введите корректную сумму от 0 до 1 000 000",
          // },
        ]}
      >
        <Input
          type="number"
          placeholder="Введите сумму призового фонда"
          prefix="₽"
          min={0}
          max={1000000} // Example maximum amount
        />
      </Form.Item>

      {/* Информация о призах */}
      <Form.Item<DescriptionFieldType>
        label={<FormItemLabel text="Информация о призах" />}
        name="prizeInfo"
        rules={[
          {
            required: false,
            message: "Введите информацию о призах"
          },
          { max: 1000, message: "Информация о призах должна быть не более 1000 символов" },
        ]}
      >
        <Input.TextArea
          placeholder="Введите информацию о призах"
          rows={3}
        />
      </Form.Item>

      {/* Документация */}
      <Form.Item<DescriptionFieldType>
        label={<FormItemLabel text="Документация" />}
        name="documentation"
        valuePropName="file"
        rules={[
          {
            required: false,
            message: "Загрузите документацию"
          }
        ]}
      >
        <Upload beforeUpload={() => false} accept=".pdf,.doc,.docx">
          <Button icon={<UploadOutlined />}>Загрузить документацию</Button>
        </Upload>
      </Form.Item>

      {/* Теги */}
      <Form.Item<DescriptionFieldType>
        label={<FormItemLabel text="Теги" />}
        name="tags"
        rules={[
          {
            required: true,
            message: "Выберите хотя бы один тег"
          }
        ]}
      >
        <Select
          mode="multiple"
          placeholder="Выберите теги"
          options={[
            { value: "AI", label: "AI" },
            { value: "ML", label: "ML" },
            { value: "RL", label: "RL" },
            { value: "NLP", label: "NLP" }
          ]}
        />
      </Form.Item>
    </>
  );
};

export default Description;