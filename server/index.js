import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";     // Main app file
import "./index.css";        // Optional (agar hai to)

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);