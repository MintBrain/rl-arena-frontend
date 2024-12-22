import { Form, FormInstance } from "antd";
import React from "react";
import {  Select } from "antd";
import FormItemLabel from "../../components/FormItemLabel.tsx";

interface Props {
  form: FormInstance;
}


const Publication: React.FC<Props> = ({ form }) => {
  return (
    <>
      <Form
        form={form}
        name="publication"
        layout="vertical"
        requiredMark={false}
        initialValues={{
          visibility: "public",
          participation: "everyone"
        }}
      >
        {/* Публичность (Visibility) */}
        <Form.Item
          label={<FormItemLabel text="Публичность" />}
          name="visibility"
          rules={[
            {
              required: true,
              message: "Выберите публичность"
            }
          ]}
        >
          <Select placeholder="Выберите публичность">
            <Select.Option value="public">Публичное</Select.Option>
            <Select.Option value="private">Приватное</Select.Option>
          </Select>
        </Form.Item>

        {/* Кто может участвовать (Who can participate) */}
        <Form.Item
          label={<FormItemLabel text="Кто может участвовать" />}
          name="participation"
          rules={[
            {
              required: true,
              message: "Выберите, кто может участвовать"
            }
          ]}
        >
          <Select placeholder="Выберите, кто может участвовать">
            <Select.Option value="everyone">Все</Select.Option>
            <Select.Option value="byLink">По ссылке-приглашению</Select.Option>
            <Select.Option value="manualApproval">Ручное принятие</Select.Option>
            <Select.Option value="emailRestriction">Ограничение по почте</Select.Option>
          </Select>
        </Form.Item>


      </Form>
    </>
  );
};

export default Publication;