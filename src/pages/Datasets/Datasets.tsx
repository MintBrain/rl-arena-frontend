import CardWheel from "./CardWheel.tsx";
import DatasetCard from "../../components/DatasetCard.tsx";
import DatasetsHeader from "./DatasetsHeader.tsx";


const cardProps = {
  title:"Заголовок датасета",
  description:"Какое-то краткое описание карточки,какое-то краткое описание карточки, какое-то краткое описание карточки.",
  tags:["Первый тег", "Второй тег"],
  size: 1058576,
  uploadDate: Date.now() + 86403  * 1000,
}

const Datasets = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", alignSelf: "start" }}>
      <DatasetsHeader />
      <CardWheel title={'Избранные датасеты'} items={Array(4).fill(<DatasetCard {...cardProps} />)} />
      <CardWheel title={'Новые датасеты'} items={Array(4).fill(<DatasetCard {...cardProps} />)} />
    </div>
  );
};

export default Datasets;