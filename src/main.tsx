import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";

import "./styles/Layout.css";  // <--- importa el layout global

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>

      {/* Aquí el contenedor NO envuelve al header */}
      <App />

    </BrowserRouter>
  </React.StrictMode>
);
