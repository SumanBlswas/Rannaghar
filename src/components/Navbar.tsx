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
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { useLoggedIn } from "../Context/useLoggedIn";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn } = useLoggedIn();
  const token = localStorage.getItem("token");

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
          <Link to="/">
            <Text fontSize="xl" fontFamily="mono" rounded={"full"}>
              Home
            </Text>
          </Link>
          {isLoggedIn || token ? (
            <Link to="/account">
              <Text fontSize="xl" fontFamily="mono" rounded={"full"}>
                Account
              </Text>
            </Link>
          ) : (
            <Link to="/login">
              <Text fontSize="xl" fontFamily="mono" rounded={"full"}>
                Login
              </Text>
            </Link>
          )}
          {isLoggedIn || token ? (
            <Link to="/favourite">
              <Text fontSize="xl" fontFamily="mono" rounded={"full"}>
                Favourite
              </Text>
            </Link>
          ) : (
            <Link to="/login">
              <Text fontSize="xl" fontFamily="mono" rounded={"full"}>
                Favourite
              </Text>
            </Link>
          )}
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
                {isLoggedIn || token ? (
                  <Link to="/account" onClick={toggleMenu}>
                    Account
                  </Link>
                ) : (
                  <Link to="/login" onClick={toggleMenu}>
                    Login
                  </Link>
                )}
                {isLoggedIn || token ? (
                  <Link to="/favourite" onClick={toggleMenu}>
                    Favourite
                  </Link>
                ) : (
                  <Link to="/login" onClick={toggleMenu}>
                    Favourite
                  </Link>
                )}
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Box>
  );
};
