import { useParams } from "react-router-dom";
import { useState } from "react";
import { Button, Tabs, type TabsProps, Typography } from "antd";
import LeaderBoard from "./LeaderBoard.tsx";
import SendSolution from "./SendSolution.tsx";
import Description from "./Description.tsx";
import "./Competition.css";

const items: TabsProps["items"] = [
  {
    label: <span className="tab-label">Информация о соревновании</span>,
    key: "description"
  },
  {
    label: <span className="tab-label">Таблица лидеров</span>,
    key: "leaderboard"
  },
  {
    label: <span className="tab-label">Отправить результат</span>,
    key: "sendSolution"
  }
];


const Competition = () => {
  const { id } = useParams();
  const [currentTab, setCurrentTab] = useState("description");


  const renderContent = () => {
    switch (currentTab) {
      case "description":
        return <Description />;
      case "leaderboard":
        return <LeaderBoard />;
      case "sendSolution":
        return <SendSolution />;
      default:
        return null;
    }
  };


  return (
    <>
      <div className="competition-page w-full h-full flex justify-center items-center bg-background-primary">
        <div className="flex justify-center flex-col max-w-[78.5%] self-start w-full">
          <div className="flex flex-row mt-[16px] justify-between">
            <Typography.Text className="text-left text-text opacity-85 text-xxl font-medium font-inter">
              Название соревнования
            </Typography.Text>
            <Button type="primary" htmlType="submit" className="w-[95px] rounded-[2px]">
              Участвовать
            </Button>
          </div>
          <Typography.Text className="text-left text-text opacity-85 text-sm font-default mt-[9px] mb-[16px]">
            Краткое описание соревнования
          </Typography.Text>

          <Tabs items={items} onChange={(activeKey) => setCurrentTab(activeKey)} tabBarGutter={32}
                defaultActiveKey={currentTab} />
          {renderContent()}
        </div>
      </div>
    </>
  );
};

export default Competition;