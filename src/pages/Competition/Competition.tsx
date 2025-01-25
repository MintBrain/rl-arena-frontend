import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, message, Tabs, type TabsProps, Typography } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import LeaderBoard, { LeaderboardEntry } from "./LeaderBoard.tsx";
import SendSolution from "./SendSolution.tsx";
import Description, { type DescriptionProps } from "./Description.tsx";
import { CompetitionData } from "../../types/api.ts";
import api from "../../api/service.api.ts";
import "./Competition.css";
import { observer } from "mobx-react-lite";
import dayjs from "dayjs";
import useStore from "../../hooks/useStore.hook.tsx";


const Competition = observer(() => {
  const { url } = useParams();
  const [currentTab, setCurrentTab] = useState("description");
  const [competitionData, setCompetitionData] = useState<CompetitionData>();
  const navigate = useNavigate();
  const [leaderboardD, setL] = useState<LeaderboardEntry[]>([]);
  const { userStore } = useStore();
  const [participating, setParticipating] = useState(false);


  useEffect(() => {
    const fetchCompetitionData = async () => {
      try {
        if (!url) {
          navigate("/competitions");
          return;
        }
        const response = await api.getCompetition(url);

        if (response.status === 401) {
          message.error("Ошибка авторизации.");
        } else if (response.status == 404) {
          navigate("/");
        } else if (response.status !== 200) {
          message.error("Ошибка получения данных соревнования. Попробуйте еще.");
        } else {
          setCompetitionData(response.data);
        }
      } catch (error) {
        console.error(error);
        message.error("Ошибка получения данных соревнования. Попробуйте еще.");
      }
    };

    void fetchCompetitionData();
  }, [navigate, url]);

  if (!competitionData) {
    return <LoadingOutlined className="text-[40px]" />;
  }

  const descriptionProps: DescriptionProps = {
    shortDescription: competitionData.shortDescription,
    detailedDescription: competitionData.detailedDescription,
    goals: competitionData.goals,
    rules: competitionData.rules,
    prizeAmount: competitionData.prizeAmount,
    prizeInfo: competitionData.prizeInfo,
    documentation: competitionData.documentation?.map((url, index) => ({
      name: `Document ${index + 1}`,
      url
    })),
    tags: competitionData.tags,
    startDate: competitionData.startDate,
    endDate: competitionData.endDate,
    author: competitionData.author
  };

  const addNewLC = () => {
    const randomScore = Math.floor(Math.random() * 101);

    if (!userStore.userData) {
      void message.error("Неавторизован");
      return;
    }

    const existingIndex = leaderboardD.findIndex(entry => entry.name === userStore.userData.username);

    if (existingIndex !== -1) {
      // If the user exists, update the score and increase submissions
      setL((prevLeaderboard) => {
        const updatedLeaderboard = [...prevLeaderboard];
        const entryToUpdate = updatedLeaderboard[existingIndex];

        entryToUpdate.score = randomScore; // Update the score (or use some logic for score update)
        entryToUpdate.submissions += 1; // Increment the submissions count
        entryToUpdate.lastSubmission = dayjs().format("YYYY-MM-DD HH:mm:ss"); // Update the submission time

        return updatedLeaderboard;
      });
    } else {
      // Create a new leaderboard entry if the user does not exist
      const newLeaderboardEntry: LeaderboardEntry = {
        rank: leaderboardD.length + 1, // Calculate rank based on length or a more sophisticated approach
        name: userStore.userData.username,
        score: randomScore,
        submissions: 1,
        lastSubmission: dayjs().format("YYYY-MM-DD HH:mm:ss")
      };

      // Add the new entry to the leaderboard
      setL((prevLeaderboard) => [...prevLeaderboard, newLeaderboardEntry]);
    }

    // Optionally, you can sort the leaderboard based on score or rank
    setL((prevLeaderboard) => [...prevLeaderboard].sort((a, b) => b.score - a.score));

    setCurrentTab("leaderboard");
  };

  const items: TabsProps["items"] = [
    {
      label: <span className="tab-label">Информация о соревновании</span>,
      key: "description",
      children: <Description {...descriptionProps} />
    },
    {
      label: <span className="tab-label">Таблица лидеров</span>,
      key: "leaderboard",
      children: <LeaderBoard leaderboard={leaderboardD} />
    },
    ...(participating && userStore.isLoggedIn
      ? [
        {

          label: <span className="tab-label">Отправить результат</span>,
          key: "sendSolution",
          children: <SendSolution callback={() => addNewLC()} isParticipating={participating}
                                  callback2={() => setCurrentTab("description")} />
        }
      ]
      : []) // Only include this tab if `participating` is true
  ];

  return (
    <>
      <div className="competition-page w-full h-full flex justify-center items-center bg-background-primary">
        <div className="flex justify-center flex-col max-w-[78.5%] self-start w-full">
          <div className="flex flex-row mt-[16px] justify-between">
            <Typography.Text className="text-left text-text opacity-85 text-xxl font-medium font-inter">
              {competitionData.name}
            </Typography.Text>
            {userStore.isLoggedIn ? <Button type="primary" htmlType="button" onClick={() => {
              setParticipating(!participating);
              if (!participating) {
                void message.success("Вы зарегистрировались в соревновании");
              }
            }} className="w-auto rounded-[2px] ml-[10px]">
              {!participating ? "Участвовать" : "Выйти из соревнования"}
            </Button> : null}
          </div>
          <Typography.Text className="text-left text-text opacity-85 text-sm font-default mt-[9px] mb-[16px]">
            {competitionData.subtitle}
          </Typography.Text>

          <Tabs items={items}
                tabBarGutter={50}
                onChange={(activeKey) => setCurrentTab(activeKey)}
                defaultActiveKey={currentTab}
                activeKey={currentTab} />
        </div>
      </div>
    </>
  );
});

export default Competition;