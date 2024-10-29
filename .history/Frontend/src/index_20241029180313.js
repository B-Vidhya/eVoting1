import React from "react";
import ReactDOM from "react-dom";
import "./Styles/styles.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";

// Clear local storage at app start
localStorage.clear();

ReactDOM.render(
  <React.StrictMode>
    {/* Wrap App with ChakraProvider */}
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
