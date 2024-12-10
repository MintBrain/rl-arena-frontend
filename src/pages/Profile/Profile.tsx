import ProfileHeader from "./ProfileHeader.tsx";
import ProfileDescription from "./ProfileDescription.tsx";
import ProfileCompetitions from "./ProfileCompetitions.tsx";
import dayjs from "dayjs";
import ProfileStatistics from "./ProfileStatistics.tsx";


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
  2: { solutionCount: 0, participationCount: 1 },
  // Add other months here...
};

const Profile = () => {
  return (
    <div className="flex flex-col self-start max-w-full items-center justify-center bg-background-primary h-full">
      <ProfileHeader username="username" fullName="Имя Фамилия" registrationDate={dayjs().unix() * 1000}
                     lastLoginDate={dayjs().unix() * 1000} />
      <ProfileDescription
        description={descriptionData} />
      <ProfileCompetitions competitions={Array(6).fill(competitionData)} />
      <ProfileStatistics data={statisticsData} />
    </div>
  );
};

export default Profile;