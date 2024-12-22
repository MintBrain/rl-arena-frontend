import { Tabs, Typography } from "antd";
import type {TabsProps} from "antd";
import React, { useState } from "react";
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


const CreateCompetition = () => {
  const [currentTab, setCurrentTab] = useState("generalInfo");

  const renderContent = () => {
    switch (currentTab) {
      case "generalInfo":
        return <GeneralInfo />;
      case "publication":
        return <Publication />;
      case "description":
        return <Description />;
      case "environment":
        return <Environment />;
      default:
        return null; // Or fallback component
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center bg-background-primary">
      <div className="w-full flex self-start justify-center flex-col items-center">
        <div className="flex justify-center flex-col min-w-[78.5%]">
          <Typography.Text className="text-left text-text opacity-85 text-xxl font-medium font-inter mt-[16px]">
            Создать соревнование
          </Typography.Text>
          <Typography.Text className="text-left text-text opacity-85 text-sm font-default mt-[9px] mb-[16px]">
            Проведите собственное соревнование на платформе RL Arena.
          </Typography.Text>

          <Tabs className="tab-nav" tabBarStyle={{ marginBottom: 10 }} items={items}
                onChange={(activeKey) => setCurrentTab(activeKey)} tabBarGutter={0} defaultActiveKey="generalInfo" />
        </div>
      <div className="flex justify-center flex-col">{renderContent()}</div>
      </div>

      {/*<div className="flex justify-center flex-col min-w-[78.5%] self-start">*/}
      {/*  <Typography.Text className="text-left text-text opacity-85 text-xxl font-medium font-inter mt-[16px]">*/}
      {/*    Создать соревнование*/}
      {/*  </Typography.Text>*/}
      {/*  <Typography.Text className="text-left text-text opacity-85 text-sm font-default mt-[9px] mb-[16px]">*/}
      {/*    Проведите собственное соревнование на платформе RL Arena.*/}
      {/*  </Typography.Text>*/}

      {/*  <Tabs items={items} tabBarGutter={0} defaultActiveKey="generalInfo" />*/}
      {/*</div>*/}
    </div>
  );
};

export default CreateCompetition;