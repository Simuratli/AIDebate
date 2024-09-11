import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import './style/global.scss';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
