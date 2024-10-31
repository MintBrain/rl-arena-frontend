import { ComponentPreview, Previews } from "@react-buddy/ide-toolbox";
import { PaletteTree } from "./palette";
import Main from "../pages/Main/Main.tsx";
import App from "../App.tsx";
import Navigation from "../Navigation/Navigation.tsx";

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
    </Previews>
  );
};

export default ComponentPreviews;