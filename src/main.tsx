import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
//aos for animation
import "aos/dist/aos.css";
import AOS from "aos";

AOS.init({
  duration: 800,
  once: true,
  offset: 100,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
