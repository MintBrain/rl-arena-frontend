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


const competitionData =
  {
    title: "Название соревнования",
    shortDescription: "Краткое описание соревнования.",
    prize: "$100,000",
    deadline: "1 месяц до окончания",
    image: "vite.svg"
  };

const descriptionData = "В своём стремлении повысить качество жизни, они забывают, что убеждённость некоторых оппонентов позволяет выполнить важные задания по разработке новых предложений! Идейные соображения высшего порядка, а также базовый вектор развития играет важную роль в формировании направлений прогрессивного развития. А также предприниматели в сети интернет набирают популярность среди определенных слоев населения, а значит, должны быть своевременно верифицированы.";

const statisticsData = {
  0: { solutionCount: 1, participationCount: 3 },
  1: { solutionCount: 2, participationCount: 4 },
  2: { solutionCount: 0, participationCount: 1 }
  // Add other months here...
};

const Profile = observer(() => {
  const { userStore } = useStore();
  const navigate = useNavigate();

  if (!userStore.isFetched) {
    return <LoadingOutlined className="text-[40px]" />;
  }

  if (!userStore.isLoggedIn || !userStore.userData) {
    return <>{navigate('/login')}</>;
  }

  const onProfileImageUpload: UploadProps['customRequest']  = async ({ file, onSuccess,  }) => {
    try {
      onSuccess?.("ok");
      console.log(file);

      const response = await api.updateUser({profile_image: file as File});
      if (response.status == 200) {
        userStore.setFetched(false);
        message.success("Изображение профиля успешно обновлено!")
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
    <div className="flex flex-col self-start max-w-full items-center justify-center bg-background-primary h-full">
      <ProfileHeader username={userStore.userData.username} fullName="Имя Фамилия"
                     registrationDate={dayjs(userStore.userData.date_registered)}
                     lastLoginDate={dayjs()}
                     profileImage={userStore.userData.profile_image}
                     handleUpload={onProfileImageUpload}/>
      <ProfileDescription
        description={descriptionData} />
      <ProfileCompetitions competitions={Array(6).fill(competitionData)} />
      <ProfileStatistics data={statisticsData} />
    </div>
  </>
  );
});

export default Profile;