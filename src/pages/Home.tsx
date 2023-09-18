import React, { useState, useEffect } from "react";
import { Box, Input, Button, Center, Flex } from "@chakra-ui/react";
import { getRandomRecipes, searchRecipes } from "../api/recipeApi";
import RecipeList from "../components/RecipeList";
import { Recipe } from "../components/RecipeDetails";

const Home: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getRandomRecipes(12).then((data) => {
      setRecipes(data);
    });
  }, []);

  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      return;
    }
    const results = await searchRecipes(searchQuery);
    setRecipes(results);
  };

  console.log(searchQuery);

  return (
    <Box>
      <Center>
        <Flex gap={5} placeItems={"center"}>
          <Input
            placeholder="Search for recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            border={"1px solid gray"}
            p={24}
            pl={5}
            pt={7}
            pb={7}
            borderRadius={10}
            fontSize={"xl"}
            fontFamily={"mono"}
            fontWeight={"bold"}
          />
          <Button
            colorScheme={"purple"}
            p={7}
            fontSize={"xl"}
            fontWeight={"bold"}
            fontFamily={"mono"}
            variant={"outline"}
            onClick={handleSearch}
          >
            Search
          </Button>
        </Flex>
      </Center>
      <RecipeList recipes={recipes} />
    </Box>
  );
};

export default Home;
