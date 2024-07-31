import React from "react";
import ReactDOM from "react-dom";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primeicons/primeicons.css";

import CssBaseline from "@mui/material/CssBaseline";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
