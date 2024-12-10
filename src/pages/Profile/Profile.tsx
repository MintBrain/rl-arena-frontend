import ProfileHeader from "./ProfileHeader.tsx";
import ProfileDescription from "./ProfileDescription.tsx";
import ProfileCompetitions  from "./ProfileCompetitions.tsx";
import dayjs from "dayjs";

const Profile = () => {
  return (
    <div className="flex flex-col self-start w-full items-center">
      <ProfileHeader username="username" fullName="Имя Фамилия" registrationDate={dayjs().unix()*1000} lastLoginDate={dayjs().unix()} />
      <ProfileDescription description={"В своём стремлении повысить качество жизни, они забывают, что убеждённость некоторых оппонентов позволяет выполнить важные задания по разработке новых предложений! Идейные соображения высшего порядка, а также базовый вектор развития играет важную роль в формировании направлений прогрессивного развития. А также предприниматели в сети интернет набирают популярность среди определенных слоев населения, а значит, должны быть своевременно верифицированы."} />
      <ProfileCompetitions />
      </div>
  );
};

export default Profile;