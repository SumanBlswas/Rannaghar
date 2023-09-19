import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { AllRoute } from "./Routes/Route";
import { Navbar } from "./components/Navbar";
import "./App.css";
import axios from "axios";

const App: React.FC = () => {
  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        axios.defaults.headers.common["Authorization"] = token;
      }
    } catch (error) {
      console.error("Error setting Authorization header:", error);
    }
  }, []);
  return (
    <Box>
      <Navbar />
      <Box pt={24}>
        <AllRoute />
      </Box>
    </Box>
  );
};

export default App;
