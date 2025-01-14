import ProfileHeader from "./ProfileHeader.tsx";
import ProfileDescription from "./ProfileDescription.tsx";
import ProfileCompetitions from "./ProfileCompetitions.tsx";
import dayjs from "dayjs";
import ProfileStatistics from "./ProfileStatistics.tsx";
import useStore from "../../hooks/useStore.hook.tsx";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
import { observer } from "mobx-react-lite";


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
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!userStore.isLoggedIn) {
  //     navigate("/login");
  //   }
  // }, [userStore.isLoggedIn, navigate]); // Dependency array ensures it runs when `isLoggedIn` changes

  if (!userStore.isLoggedIn) {
    // Optionally, return null or a placeholder while navigating
    return null;
  }

  if (!userStore.userData) {
    return null;
  }

  return (
  <>
    <div className="flex flex-col self-start max-w-full items-center justify-center bg-background-primary h-full">
      <ProfileHeader username={userStore.userData.username} fullName="Имя Фамилия" registrationDate={dayjs(userStore.userData.date_registered)}
                     lastLoginDate={dayjs()} profileImage={userStore.userData.profile_image} />
      <ProfileDescription
        description={descriptionData} />
      <ProfileCompetitions competitions={Array(6).fill(competitionData)} />
      <ProfileStatistics data={statisticsData} />
    </div>
  </>
  );
});

export default Profile;