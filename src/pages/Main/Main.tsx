import MainHeader from "./MainHeader.tsx";
import CardWheel from "./CardWheel.tsx";
import CompetitionCard from "../../components/CompetitionCard.tsx";

const cardProps = {
  title:"Заголовок соревнования",
  description:"Какое-то краткое описание карточки,какое-то краткое описание карточки, какое-то краткое описание карточки.",
  tags:["RL", "Fruits", "Fruits"],
  reward: 1000,
  deadline: Date.now() + 88600 * 1000,
}

function Main() {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", alignSelf: "start" }}>
      <MainHeader />
      <CardWheel title={'Мои соревнования'} items={Array(4).fill(<CompetitionCard {...cardProps} />)} />
      <CardWheel title={'Новые соревнования'} items={Array(4).fill(<CompetitionCard {...cardProps} />)} />
    </div>
  );
}

export default Main;