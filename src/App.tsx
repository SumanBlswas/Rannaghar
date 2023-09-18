import React from "react";
import { Box } from "@chakra-ui/react";
import { AllRoute } from "./Routes/Route";
import { Navbar } from "./components/Navbar";

const App: React.FC = () => {
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
