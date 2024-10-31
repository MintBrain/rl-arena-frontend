import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { DevSupport } from "@react-buddy/ide-toolbox";
import ComponentPreviews from "./dev/previews.tsx";
import { useInitial } from "./dev";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DevSupport ComponentPreviews={ComponentPreviews}
                useInitialHook={useInitial}>
      <App />
    </DevSupport>
  </StrictMode>
);