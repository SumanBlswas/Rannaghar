import {
  Box,
  Flex,
  Heading,
  IconButton,
  Stack,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  DrawerHeader,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Box
      pos="fixed"
      bgColor="red.200"
      zIndex={10}
      w="full"
      fontFamily="cursive"
    >
      <Flex justifyContent="space-between" p={5} alignItems="center">
        <Link to="/">
          <Heading fontFamily="cursive">Rannaghar</Heading>
        </Link>

        <IconButton
          display={{ base: "block", md: "none" }}
          aria-label="Open menu"
          icon={
            <Flex justifyContent={"center"}>
              <FaBars />
            </Flex>
          }
          onClick={toggleMenu}
        />

        <Flex
          gap={5}
          fontSize="xl"
          fontWeight="semibold"
          display={{ base: "none", md: "flex" }}
        >
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/favourite">Favourite</Link>
        </Flex>
      </Flex>

      <Drawer isOpen={isMenuOpen} placement="left" onClose={toggleMenu}>
        <DrawerOverlay>
          <DrawerContent bgColor="red.200">
            <DrawerCloseButton />
            <DrawerHeader fontSize="xl" fontFamily="cursive">
              Menu
            </DrawerHeader>
            <DrawerBody>
              <Stack
                spacing={3}
                textAlign="center"
                fontWeight={"semibold"}
                fontFamily={"mono"}
                textDecor={"underline"}
                fontSize={"xl"}
              >
                <Link to="/" onClick={toggleMenu}>
                  Home
                </Link>
                <Link to="/login" onClick={toggleMenu}>
                  Login
                </Link>
                <Link to="/favourite" onClick={toggleMenu}>
                  Favourite
                </Link>
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Box>
  );
};
