import React, { useState, useEffect } from "react";
import {
  Box,
  Input,
  Button,
  Center,
  Flex,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { getRandomRecipes, searchRecipes } from "../api/recipeApi";
import RecipeList from "../components/RecipeList";
import { Recipe } from "../Types/types";

const Home: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadRecipes();
    // eslint-disable-next-line
  }, [page]);

  const loadRecipes = async () => {
    setLoading(true);

    let loadedRecipes: Recipe[] = [];
    if (searchQuery.trim() === "") {
      loadedRecipes = await getRandomRecipes(12, page);
    } else {
      loadedRecipes = await searchRecipes(searchQuery, page, 12);
    }

    if (page === 1) {
      setRecipes(loadedRecipes);
    } else {
      setRecipes([...recipes, ...loadedRecipes]);
    }

    setLoading(false);
  };

  const handleSearch = () => {
    setPage(1);
    loadRecipes();
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  return (
    <Box pb={5}>
      <Center p={{ base: 5, sm: 0 }}>
        <Flex gap={5} placeItems={"center"}>
          <Input
            placeholder={"Search for recipes..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            border={"1px solid gray"}
            p={{ base: 0, sm: 24 }}
            pl={{ base: 5, sm: 5 }}
            pr={{ base: 5, sm: 0 }}
            pt={{ base: 7, sm: 7 }}
            pb={{ base: 7, sm: 7 }}
            borderRadius={10}
            fontSize={{ base: "lg", sm: "xl" }}
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
      {loading && (
        <Center>
          <Spinner size="lg" color="purple" />
        </Center>
      )}
      {!loading && recipes.length > 0 && (
        <Center>
          <Button
            colorScheme={"purple"}
            p={5}
            borderRadius={10}
            fontSize={"xl"}
            fontWeight={"bold"}
            fontFamily={"mono"}
            onClick={loadMore}
          >
            Load More
          </Button>
        </Center>
      )}
      {!loading && recipes.length === 0 && (
        <Center>
          <Text>No recipes found.</Text>
        </Center>
      )}
    </Box>
  );
};

export default Home;
