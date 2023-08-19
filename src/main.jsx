import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import reportWebVitals from "./reportWebVitals.js";

import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "./theme";

const theme = createTheme();

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);

reportWebVitals();
