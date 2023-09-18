import { Box, Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <Box
      pos={"fixed"}
      bgColor={"red.200"}
      zIndex={10}
      w={"full"}
      fontFamily={"cursive"}
    >
      <Flex justifyContent={"space-between"} p={5} placeItems={"center"}>
        <Link to={"/"}>
          <Heading fontFamily={"cursive"}>Rannaghar</Heading>
        </Link>
        <Flex gap={5} fontSize={"xl"} fontWeight={"semibold"}>
          <Link to={"/"}>Home</Link>
          <Link to={"/login"}>Login</Link>
          <Link to={"/favourite"}>Favourite</Link>
        </Flex>
      </Flex>
    </Box>
  );
};
