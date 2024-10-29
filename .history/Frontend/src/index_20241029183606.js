import React from "react";
import ReactDOM from "react-dom";
import "./Styles/styles.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";

// Clear local storage only on the first load
if (!localStorage.getItem("appStarted")) {
  localStorage.clear();
  localStorage.setItem("appStarted", "true");
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
