import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Favourite from "../pages/Favourite";
import { Button, Center, Text } from "@chakra-ui/react";

export const AllRoute = () => {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route path={"/"} element={<Home />} />
      <Route path={"/login"} element={<Login />} />
      <Route path={"/register"} element={<Register />} />
      <Route path={"/favourite"} element={<Favourite />} />
      <Route
        path={"*"}
        element={
          <Center
            h={"container.md"}
            display={"flex"}
            flexDirection={"column"}
            gap={5}
          >
            <Text fontFamily={"mono"} fontWeight={"bold"} fontSize={"4xl"}>
              You are in wrong Route!
            </Text>
            <Button
              colorScheme={"blue"}
              variant={"outline"}
              onClick={() => navigate("/")}
            >
              <Text>Go to Home</Text>
            </Button>
          </Center>
        }
      />
    </Routes>
  );
};
