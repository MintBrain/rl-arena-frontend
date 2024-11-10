import { ComponentPreview, Previews } from "@react-buddy/ide-toolbox";
import { PaletteTree } from "./palette";
import Main from "../pages/Main/Main.tsx";
import App from "../App.tsx";
import Navigation from "../components/Navigation.tsx";
import Login from "../pages/Login/Login.tsx";
import Register from "../pages/Register/Register.tsx";
import CodeForm from "../pages/RestorePassword/CodeForm.tsx";

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
      <ComponentPreview path="/CodeForm">
        <CodeForm />
      </ComponentPreview>
    </Previews>
  );
};

export default ComponentPreviews;