import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import DragnDrop from "./DragnDrop.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <App /> */}
    <DragnDrop />
  </StrictMode>
);
