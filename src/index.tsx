import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { DevSupport } from "@react-buddy/ide-toolbox";
import { useInitial } from "./dev";
import ComponentPreviews from "./dev/previews.tsx";
import App from "./App.tsx";
import "./index.css";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DevSupport ComponentPreviews={ComponentPreviews}
                useInitialHook={useInitial}>
      <App />
    </DevSupport>
  </StrictMode>
);