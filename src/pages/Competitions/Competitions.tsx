import CompetitionCard from "../../components/CompetitionCard.tsx";

const Competitions = () => {
  return (
    <>
      <CompetitionCard title="Заголовок соревнования"
                       description="Какое-то краткое описание карточки,
                                    какое-то краткое описание карточки,
                                    какое-то краткое описание карточки."
                       tags={["RL", "Fruits", "Fruits"]}
                       reward={1000}
                       deadline={Date.now() + 88600 * 1000} />
    </>
  );
};

export default Competitions;