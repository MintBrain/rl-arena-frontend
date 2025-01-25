import ProfileHeader from "./ProfileHeader.tsx";
import ProfileDescription from "./ProfileDescription.tsx";
import ProfileCompetitions from "./ProfileCompetitions.tsx";
import dayjs from "dayjs";
import ProfileStatistics from "./ProfileStatistics.tsx";
import useStore from "../../hooks/useStore.hook.tsx";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { LoadingOutlined } from "@ant-design/icons";
import { message, type UploadProps } from "antd";
import api from "../../api/service.api.ts";
import { useEffect, useState } from "react";
import { CompetitionData } from "../../types/api.ts";


const descriptionData = "В своём стремлении повысить качество жизни, они забывают, что убеждённость некоторых оппонентов позволяет выполнить важные задания по разработке новых предложений! Идейные соображения высшего порядка, а также базовый вектор развития играет важную роль в формировании направлений прогрессивного развития. А также предприниматели в сети интернет набирают популярность среди определенных слоев населения, а значит, должны быть своевременно верифицированы.";

const statisticsData = {
  0: { solutionCount: 1, participationCount: 3 },
  1: { solutionCount: 2, participationCount: 4 },
  2: { solutionCount: 0, participationCount: 1 }
  // Add other months here...
};

const Profile = observer(() => {
  const { userStore } = useStore();
  const [competitionsData, setCompetitionsData] = useState<CompetitionData[]>([]);
  const navigate = useNavigate();

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

  if (!userStore.isLoggedIn || !userStore.userData) {
    return <>{navigate("/login")}</>;
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

  const onProfileImageUpload: UploadProps["customRequest"] = async ({ file, onSuccess }) => {
    try {
      onSuccess?.("ok");
      console.log(file);

      const response = await api.updateUser({ profile_image: file as File });
      if (response.status == 200) {
        userStore.setFetched(false);
        message.success("Изображение профиля успешно обновлено!");
      } else {
        message.error("Произошла ошибка при загрузке изображения.");
      }
    } catch (error) {
      console.log(error);
      message.error("Произошла ошибка при загрузке изображения.");
    }
  };

  return (
    <>
      <div className="flex flex-col self-start items-start justify-start h-full bg-background-primary">
        <div className="flex flex-col max-w-full self-start items-center justify-start bg-background-primary h-full">
          <ProfileHeader username={userStore.userData.username} fullName={userStore.userData.fullname}
                         registrationDate={dayjs(userStore.userData.date_registered)}
                         lastLoginDate={dayjs()}
                         profileImage={userStore.userData.profile_image}
                         handleUpload={onProfileImageUpload} />
          <ProfileDescription
            description={descriptionData} />
          <ProfileCompetitions competitions={myCompetitions} />
          <ProfileStatistics data={statisticsData} />
        </div>
        <div className="h-[100px]" />
      </div>
    </>
  );
});

export default Profile;