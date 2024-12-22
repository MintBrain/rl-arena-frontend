import { FormInstance, Form, Radio, Input, DatePicker, Upload, Button } from "antd";
import {UploadOutlined} from "@ant-design/icons";
import React from "react";
import FormItemLabel from "../../components/FormItemLabel.tsx";

interface Props {
  form: FormInstance;
}


const GeneralInfo: React.FC<Props> = ({form}) => {

  const validateUrl = (_: any, value: string) => {
    if (!value || value.startsWith("example.com/competitions/")) {
      return Promise.resolve();
    }
    return Promise.reject(
      new Error("URL должен начинаться с example.com/competitions/")
    );
  };


  return (
    <>
      <Form
        form={form}
        name="generalInfo"
        layout="vertical"
        requiredMark={false}
        initialValues={{competitionType: "RL",}}
      >
        <Form.Item
          label={<FormItemLabel text="Название" />}
          name="name"
          rules={[{ required: true, message: "Введите название соревнования" }]}
        >
          <Input placeholder="Введите название соревнования" />
        </Form.Item>

        {/* Описание */}
        <Form.Item
          label={<FormItemLabel text="Описание" />}
          name="description"
          rules={[
            { required: true, message: "Введите описание соревнования" },
            { max: 500, message: "Описание не должно превышать 500 символов" },
          ]}
        >
          <Input.TextArea
            placeholder="Введите описание соревнования"
            rows={4}
          />
        </Form.Item>

        {/* URL-адрес соревнования */}
        <Form.Item
          label={<FormItemLabel text="URL-адрес соревнования" />}
          name="url"
          rules={[
            { required: true, message: "Введите URL-адрес соревнования" },
            { validator: validateUrl },
          ]}
        >
          <Input
            addonBefore="example.com/competitions/"
            placeholder="Введите URL-адрес"
          />
        </Form.Item>

        {/* Тип соревнования */}
        <Form.Item
          label={<FormItemLabel text="Тип соревнования" />}
          name="competitionType"
          rules={[{ required: true, message: "Выберите тип соревнования" }]}
        >
          <Radio.Group>
            <Radio value="RL">RL</Radio>
            <Radio value="ML">ML</Radio>
          </Radio.Group>
        </Form.Item>

        {/* Дата начала соревнования */}
        <Form.Item
          label={<FormItemLabel text="Дата начала соревнования" />}
          name="startDate"
          rules={[
            { required: true, message: "Выберите дату начала соревнования" },
          ]}
        >
          <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm"
            placeholder="Выберите дату и время"
          />
        </Form.Item>

        {/* Дата окончания соревнования */}
        <Form.Item
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
              },
            }),
          ]}
        >
          <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm"
            placeholder="Выберите дату и время"
          />
        </Form.Item>

        {/* Фоновое изображение */}
        <Form.Item
          label={<FormItemLabel text="Фоновое изображение" />}
          name="backgroundImage"
          valuePropName="file"
          rules={[
            { required: true, message: "Загрузите фоновое изображение" },
          ]}
        >
          <Upload
            beforeUpload={() => false} // Prevent automatic upload
            accept="image/*"
          >
            <Button icon={<UploadOutlined />}>Загрузить изображение</Button>
          </Upload>
        </Form.Item>

      </Form>
    </>
  );
};

export default GeneralInfo;