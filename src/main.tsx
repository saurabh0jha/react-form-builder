import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/app.css";
import "./styles/index.css";
import "./styles/colors.css";
import "./styles/fonts.css";
import "./styles/headings.css";
import "./styles/buttons.css";
import "./styles/inputs.css";

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
