import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Toaster } from "modl-shared-web/components/ui/toaster";

createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <Toaster />
  </>
);
