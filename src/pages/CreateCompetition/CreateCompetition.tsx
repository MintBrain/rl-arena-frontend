import { Button, Form, message, Tabs, Typography } from "antd";
import type {TabsProps} from "antd";
import type { FormProviderProps } from "antd/lib/form/context.d.ts";
import { useEffect, useState } from "react";
import  GeneralInfo  from "./GeneralInfo.tsx";
import  Description  from "./Description.tsx";
import  Environment  from "./Environment.tsx";
import  Publication  from "./Publication.tsx";
import "./CreateCompetition.css";

const items: TabsProps["items"] = [
  {
    label: <span className="tab-label">Общая информация</span>,
    key: "generalInfo",
  },
  {
    label: <span className="tab-label">Описание</span>,
    key: "description",
  },
  {
    label: <span className="tab-label">Окружение</span>,
    key: "environment",
  },
  {
    label: <span className="tab-label">Публикация</span>,
    key: "publication",
  }
]

export type FieldType = {
  name?: string;
  description?: string;
  url?: string;
  competitionType?: string;
  startDate?: string;
  endDate?: string;
  backgroundImage?: {
    file: {
      uid: string;
    };
    fileList: Array<{
      uid: string;
      lastModified: number;
      lastModifiedDate: string;
      name: string;
      size: number;
      type: string;
      percent: number;
      originFileObj: {
        uid: string;
      };
    }>;
  };
  competitionDescription?: string;
  detailedDescription?: string;
  goals?: string;
  rules?: string;
  prizeInfo?: string;
  documentation?: {
    file: {
      uid: string;
    };
    fileList: Array<{
      uid: string;
      lastModified: number;
      lastModifiedDate: string;
      name: string;
      size: number;
      type: string;
      percent: number;
      originFileObj: {
        uid: string;
      };
    }>;
  };
  tags?: string[];
  rlRepository?: string;
  rlSolutionExtension?: string;
  rlPublicFiles?: {
    file: {
      uid: string;
    };
    fileList: Array<{
      uid: string;
      lastModified: number;
      lastModifiedDate: string;
      name: string;
      size: number;
      type: string;
      percent: number;
      originFileObj: {
        uid: string;
      };
    }>;
  };
  visibility?: string; // e.g., 'public' or 'private'
  participation?: string; // e.g., 'everyone', 'byLink', 'manualApproval', 'emailRestriction'
};

const mockData: FieldType = {
  competitionType: "RL",
  tags: ["RL", "ML"],
  visibility: "public",
  participation: "everyone",
  name: "dsf",
  description: "dsfsdf",
  url: "example.com/competitions/sdf",
  // startDate: "2024-12-22T02:00:00.000Z",
  // endDate: "2024-12-30T19:08:00.000Z",
  backgroundImage: {
    file: { uid: "rc-upload-1734886430430-11" },
    fileList: [
      {
        uid: "rc-upload-1734886430430-11",
        lastModified: 1734551472562,
        lastModifiedDate: "2024-12-18T19:51:12.562Z",
        name: "ScreenShot_2024-12-19_00-51-12_001.png",
        size: 72416,
        type: "image/png",
        percent: 0,
        originFileObj: { uid: "rc-upload-1734886430430-11" }
      }
    ]
  },
  competitionDescription: "dsf",
  detailedDescription: "dsf",
  goals: "sdf",
  rules: "sdfs",
  prizeInfo: "dfsdf",
  documentation: {
    file: { uid: "rc-upload-1734886430430-29" },
    fileList: [
      {
        uid: "rc-upload-1734886430430-29",
        lastModified: 1734186462107,
        lastModifiedDate: "2024-12-14T14:27:42.107Z",
        name: "The PvZ1 Modding Info Doc.docx",
        size: 21129264,
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        percent: 0,
        originFileObj: { uid: "rc-upload-1734886430430-29" }
      }
    ]
  },
  rlRepository: "https://example.com/competitions/",
  rlSolutionExtension: ".sdf",
  rlPublicFiles: {
    file: { uid: "rc-upload-1734886430430-19" },
    fileList: [
      {
        uid: "rc-upload-1734886430430-19",
        lastModified: 1734515372378,
        lastModifiedDate: "2024-12-18T09:49:32.378Z",
        name: "doxygen_manual-1.12.0.pdf.zip",
        size: 1512872,
        type: "application/x-zip-compressed",
        percent: 0,
        originFileObj: { uid: "rc-upload-1734886430430-19" }
      }
    ]
  }
};


const CreateCompetition = () => {
  const [currentTab, setCurrentTab] = useState("generalInfo");
  const [form] = Form.useForm();


  useEffect(() => {
    form.setFieldsValue(mockData)

  }, [form]);


  const renderContent = () => {
    switch (currentTab) {
      case "generalInfo":
        return <GeneralInfo form={form} />;
      case "publication":
        return <Publication form={form} />;
      case "description":
        return <Description form={form} />;
      case "environment":
        return <Environment form={form}  />;
      default:
        return null;
    }
  };

  const onFormFinish: FormProviderProps["onFormFinish"] = (values, info) => {
    console.log(values);
    console.log(info);
    message.success("Форма отправлена!");
  }


  return (
    <div className="w-full h-full flex justify-center items-center bg-background-primary">
      <Form.Provider onFormFinish={onFormFinish}>
      <div className="flex justify-center flex-col max-w-[78.5%] self-start w-full">
        <div className="flex flex-row mt-[16px] justify-between">
        <Typography.Text className="text-left text-text opacity-85 text-xxl font-medium font-inter">
          Создать соревнование
        </Typography.Text>
          <Button type="primary" htmlType="submit" onClick={() => {form.submit()}} className="w-[95px] rounded-[2px]">
            Сохранить
          </Button>
        </div>
        <Typography.Text className="text-left text-text opacity-85 text-sm font-default mt-[9px] mb-[16px]">
          Проведите собственное соревнование на платформе RL Arena.
        </Typography.Text>

        <Tabs items={items} onChange={(activeKey) => setCurrentTab(activeKey)} tabBarGutter={0} defaultActiveKey={currentTab} />
        {renderContent()}
      </div>
      </Form.Provider>
    </div>
  );
};

export default CreateCompetition;