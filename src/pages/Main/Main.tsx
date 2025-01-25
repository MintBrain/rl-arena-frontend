import MainHeader from "./MainHeader.tsx";
import CardWheel from "./CardWheel.tsx";
import CompetitionCard from "../../components/CompetitionCard.tsx";
import { useEffect, useState } from "react";
import { CompetitionData } from "../../types/api.ts";
import api from "../../api/service.api.ts";
import { message } from "antd";
import { observer } from "mobx-react-lite";
import useStore from "../../hooks/useStore.hook.tsx";
import { LoadingOutlined } from "@ant-design/icons";


const Main = observer(() => {
  const { userStore } = useStore();
  const [competitionsData, setCompetitionsData] = useState<CompetitionData[]>([]);

  useEffect(() => {
    const fetchCompetitionsData = async () => {
      try {
        const response = await api.getAllCompetitions();

        if (response.status === 401) {
          message.error("Ошибка авторизации.");
        } else if (response.status !== 200) {
          message.error("Ошибка получения данных соревнования. Попробуйте еще.");
        } else {
          setCompetitionsData(response.data);
        }
      } catch (error) {
        console.error(error);
        message.error("Ошибка получения данных соревнований. Попробуйте еще.");
      }
    };

    void fetchCompetitionsData();
  }, []);

  if (!userStore.isFetched) {
    return <LoadingOutlined className="text-[40px]" />;
  }

  const myCompetitions = !userStore.isLoggedIn ? [] :
    competitionsData.filter((competition) => competition.author.id === userStore.userData?.id)
      .map((competition) => ({
        title: competition.name,
        description: competition.subtitle,
        tags: competition.tags,
        reward: competition.prizeAmount,
        deadline: new Date(competition.endDate).getTime(),
        backgroundImage: competition.backgroundImage,
        url: competition.url
      }));

  // Sort all competitions by creationDate (new to old) and map to CardProps
  const sortedCompetitions = competitionsData.filter(() => true).sort((a, b) => {
    const dateA = a.id;
    const dateB = b.id;
    return dateB - dateA; // Sort from new to old
  })
    .map((competition) => ({
      title: competition.name,
      description: competition.subtitle,
      tags: competition.tags,
      reward: competition.prizeAmount,
      deadline: new Date(competition.endDate).getTime(),
      backgroundImage: competition.backgroundImage,
      url: competition.url
    }));

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", alignSelf: "start" }}>
      <MainHeader />
      {myCompetitions.length > 0 ? <CardWheel title={"Мои соревнования"} items={myCompetitions.map((props) =>
        <CompetitionCard {...props} />)} /> : null}
      {sortedCompetitions.length > 0 ? <CardWheel title={"Новые соревнования"} items={sortedCompetitions.map((props) =>
        <CompetitionCard {...props} />)} /> : null}
    </div>
  );
});

export default Main;