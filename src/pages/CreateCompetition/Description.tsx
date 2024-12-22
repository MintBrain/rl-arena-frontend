import { Form, FormInstance } from "antd";
import React from "react";
import { Input, Upload, Button, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import FormItemLabel from "../../components/FormItemLabel.tsx";


interface Props {
  form: FormInstance;
}

const Description: React.FC<Props> = ({ form }) => {
  return (
    <>
      <Form
        form={form}
        name="description"
        layout="vertical"
        requiredMark={false}
        initialValues={{
          tags: []
        }}
      >
        {/* Описание соревнования */}
        <Form.Item
          label={<FormItemLabel text="Описание соревнования" />}
          name="competitionDescription"
          rules={[
            {
              required: true,
              message: "Введите описание соревнования"
            }
          ]}
        >
          <Input.TextArea
            placeholder="Введите описание соревнования"
            rows={4}
          />
        </Form.Item>

        {/* Подробное описание */}
        <Form.Item
          label={<FormItemLabel text="Подробное описание" />}
          name="detailedDescription"
          rules={[
            {
              required: true,
              message: "Введите подробное описание"
            },
            { max: 1000, message: "Не более 1000 символов" }
          ]}
        >
          <Input.TextArea
            placeholder="Введите подробное описание"
            rows={6}
          />
        </Form.Item>

        {/* Цели */}
        <Form.Item
          label={<FormItemLabel text="Цели" />}
          name="goals"
          rules={[
            {
              required: true,
              message: "Введите цели соревнования"
            }
          ]}
        >
          <Input.TextArea placeholder="Введите цели соревнования" rows={3} />
        </Form.Item>

        {/* Правила */}
        <Form.Item
          label={<FormItemLabel text="Правила" />}
          name="rules"
          rules={[
            {
              required: true,
              message: "Введите правила соревнования"
            }
          ]}
        >
          <Input.TextArea placeholder="Введите правила соревнования" rows={4} />
        </Form.Item>

        {/* Информация о призах */}
        <Form.Item
          label={<FormItemLabel text="Информация о призах" />}
          name="prizeInfo"
          rules={[
            {
              required: true,
              message: "Введите информацию о призах"
            }
          ]}
        >
          <Input.TextArea
            placeholder="Введите информацию о призах"
            rows={3}
          />
        </Form.Item>

        {/* Документация */}
        <Form.Item
          label={<FormItemLabel text="Документация" />}
          name="documentation"
          valuePropName="file"
          rules={[
            {
              required: true,
              message: "Загрузите документацию"
            }
          ]}
        >
          <Upload beforeUpload={() => false} accept=".pdf,.doc,.docx">
            <Button icon={<UploadOutlined />}>Загрузить документацию</Button>
          </Upload>
        </Form.Item>

        {/* Теги */}
        <Form.Item
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


      </Form>
    </>
  );
};

export default Description;