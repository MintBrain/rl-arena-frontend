import { ComponentPreview, Previews } from "@react-buddy/ide-toolbox";
import { PaletteTree } from "./palette";
import Main from "../pages/Main/Main.tsx";
import App from "../App.tsx";
import Navigation from "../components/Navigation.tsx";
import Login from "../pages/Login/Login.tsx";
import Register from "../pages/Register/Register.tsx";
import { Header } from "../components/Header.tsx";
import CompetitionCard from "../components/CompetitionCard.tsx";

const ComponentPreviews = () => {
  return (
    <Previews palette={<PaletteTree />}>
      <ComponentPreview path="/Main">
        <Main />
      </ComponentPreview>
      <ComponentPreview path="/App">
        <App />
      </ComponentPreview>
      <ComponentPreview path="/Navigation">
        <Navigation />
      </ComponentPreview>
      <ComponentPreview path="/Login">
        <Login />
      </ComponentPreview>
      <ComponentPreview path="/Register">
        <Register />
      </ComponentPreview>
      <ComponentPreview path="/Header">
        <Header />
      </ComponentPreview>
      <ComponentPreview path="/Card">
        <CompetitionCard title='Заголовок соревнования' description='Какое-то краткое описание карточки,
какое-то краткое описание карточки,
какое-то краткое описание карточки.' tags={['RL', 'Fruits']} reward={1000} deadline={Date.now()}/>
      </ComponentPreview>
    </Previews>
  );
};

export default ComponentPreviews;