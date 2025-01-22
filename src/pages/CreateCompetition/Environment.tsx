import React from "react";
import { Button, Form, Input, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import FormItemLabel from "../../components/FormItemLabel.tsx";
import { BeforeUploadParamsType } from "../../types/antdBased.tsx";

export type EnvironmentFieldType = {
  rlRepository: string;
  rlSolutionExtension: string;
  rlPublicFiles: BeforeUploadParamsType;

  mlMetric: string;
  mlTargetVariable: string;
  mlPublicDataset: BeforeUploadParamsType;
  mlPrivateDataset: BeforeUploadParamsType;
}

const Environment: React.FC = () => {
  const form = Form.useFormInstance();
  const competitionType: "RL" | "ML" = form.getFieldValue("competitionType");

  return (
    <>
      {/* RL Fields */}
      {competitionType === "RL" && (
        <>
          <Form.Item<EnvironmentFieldType>
            label={<FormItemLabel text="Ссылка на git репозиторий" />}
            name="rlRepository"
            rules={[
              {
                required: true,
                message: "Введите ссылку на git репозиторий"
              },
              {
                type: "url",
                message: "Введите корректный URL-адрес"
              }
            ]}
          >
            <Input placeholder="Введите ссылку на git репозиторий" />
          </Form.Item>

          <Form.Item<EnvironmentFieldType>
            label={<FormItemLabel text="Расширение для решений" />}
            name="rlSolutionExtension"
            rules={[
              {
                required: true,
                message: "Введите расширение для решений"
              }
            ]}
          >
            <Input placeholder="Введите расширение для решений" />
          </Form.Item>

          <Form.Item<EnvironmentFieldType>
            label={<FormItemLabel text="Публичные файлы среды" />}
            name="rlPublicFiles"
            valuePropName="file"
            rules={[
              {
                required: true,
                message: "Загрузите файлы среды"
              }
            ]}
          >
            <Upload beforeUpload={() => false} accept=".zip,.rar,.7z">
              <Button icon={<UploadOutlined />}>
                Загрузить файлы среды
              </Button>
            </Upload>
          </Form.Item>
        </>
      )}

      {/* ML Fields */}
      {competitionType === "ML" && (
        <>
          <Form.Item<EnvironmentFieldType>
            label={<FormItemLabel text="Метрика" />}
            name="mlMetric"
            rules={[
              {
                required: true,
                message: "Выберите метрику"
              }
            ]}
          >
            <Select
              placeholder="Выберите метрику"
              options={[
                { value: "Accuracy", label: "Accuracy" },
                { value: "F1", label: "F1" },
                { value: "F1 Macro", label: "F1 Macro" },
                { value: "Precision", label: "Precision" },
                { value: "Recall", label: "Recall" },
                { value: "ROC AUC", label: "ROC AUC" },
                { value: "R2", label: "R2" }
              ]}
            />
          </Form.Item>

          <Form.Item<EnvironmentFieldType>
            label={
              <FormItemLabel text="Целевая переменная" />
            }
            name="mlTargetVariable"
            rules={[
              {
                required: true,
                message: "Введите название столбца с целевым значением"
              }
            ]}
          >
            <Input placeholder="Введите название столбца с целевым значением" />
          </Form.Item>

          <Form.Item<EnvironmentFieldType>
            label={<FormItemLabel text="Публичный набор данных" />}
            name="mlPublicDataset"
            valuePropName="file"
            rules={[
              {
                required: true,
                message: "Загрузите публичный набор данных"
              }
            ]}
          >
            <Upload beforeUpload={() => false} accept=".csv,.xlsx">
              <Button icon={<UploadOutlined />}>
                Загрузить публичный набор данных
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item<EnvironmentFieldType>
            label={<FormItemLabel text="Приватный набор данных" />}
            name="mlPrivateDataset"
            valuePropName="file"
            rules={[
              {
                required: true,
                message: "Загрузите приватный набор данных"
              }
            ]}
          >
            <Upload beforeUpload={() => false} accept=".csv,.xlsx">
              <Button icon={<UploadOutlined />}>
                Загрузить приватный набор данных
              </Button>
            </Upload>
          </Form.Item>
        </>
      )}

    </>
  );
};

export default Environment;