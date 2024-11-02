import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { DevSupport } from "@react-buddy/ide-toolbox";
import { useInitial } from "./dev";
import ComponentPreviews from "./dev/previews.tsx";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
    <DevSupport ComponentPreviews={ComponentPreviews}
                useInitialHook={useInitial}>
      <App />
    </DevSupport>
    </BrowserRouter>
  </StrictMode>
);