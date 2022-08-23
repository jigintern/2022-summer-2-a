import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import First from "@/pages/first";
import Wait from "./pages/wait";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<First />} />
      <Route path="/wait" element={<Wait />} />
    </Routes>
  </BrowserRouter>
);
