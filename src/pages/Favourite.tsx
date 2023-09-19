import { Box, Heading } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import RecipeList from "../components/RecipeList";

const Favourite = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const getFavRecipes = async () => {
      try {
        const favRecipe = await axios.get(`http://localhost:7000/fav-recipe`);
        setRecipes(favRecipe.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFavRecipes();
  }, []);
  return (
    <Box>
      <Heading textAlign={"center"} m={5} pb={5}>
        My Favourite Recipes
      </Heading>
      <RecipeList recipes={recipes} />
    </Box>
  );
};

export default Favourite;
