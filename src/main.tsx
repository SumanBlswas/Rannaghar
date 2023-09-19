import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { LoggedInProvider } from "./Context/LoggedInContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <LoggedInProvider>
          <App />
        </LoggedInProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
