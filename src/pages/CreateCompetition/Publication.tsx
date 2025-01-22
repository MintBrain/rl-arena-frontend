import React from "react";
import { Form, Select } from "antd";
import FormItemLabel from "../../components/FormItemLabel.tsx";

export type PublicationFieldType = {
  visibility: string; // e.g., 'public' or 'private'
  participation: string; // e.g., 'everyone', 'byLink', 'manualApproval', 'emailRestriction'
}

const Publication: React.FC = () => {
  return (
    <>
      {/* Публичность (Visibility) */}
      <Form.Item<PublicationFieldType>
        label={<FormItemLabel text="Видимость" />}
        name="visibility"
        rules={[
          {
            required: true,
            message: "Выберите видимость соревнования"
          }
        ]}
      >
        <Select placeholder="Выберите видимость">
          <Select.Option value="public">Публичное</Select.Option>
          <Select.Option value="private">Приватное</Select.Option>
        </Select>
      </Form.Item>

      {/* Кто может участвовать (Who can participate) */}
      <Form.Item<PublicationFieldType>
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


    </>
  );
};

export default Publication;