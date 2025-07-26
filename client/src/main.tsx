import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Toaster } from "@modl-gg/shared-web/components/ui/toaster";

createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <Toaster />
  </>
);
