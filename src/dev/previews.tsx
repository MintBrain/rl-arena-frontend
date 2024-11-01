import { ComponentPreview, Previews } from "@react-buddy/ide-toolbox";
import { PaletteTree } from "./palette";
import Main from "../pages/Main/Main.tsx";
import App from "../App.tsx";
import Navigation from "../components/Navigation.tsx";
import Login from "../pages/Login/Login.tsx";

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
    </Previews>
  );
};

export default ComponentPreviews;