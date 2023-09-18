import React, { useState, useEffect } from "react";
import { ChakraProvider, Box, Input, Button } from "@chakra-ui/react";
import { getRandomRecipes, searchRecipes } from "./api/recipeApi";
import RecipeList from "./components/RecipeList";
import RecipeDetails, { Recipe } from "./components/RecipeDetails";

const App: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    getRandomRecipes(10).then((data) => {
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

  const handleRecipeSelect = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  return (
    <ChakraProvider>
      <Box>
        <Input
          placeholder="Search for recipes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
        {selectedRecipe ? (
          <RecipeDetails recipe={selectedRecipe} />
        ) : (
          <RecipeList recipes={recipes} onSelect={handleRecipeSelect} />
        )}
      </Box>
    </ChakraProvider>
  );
};

export default App;
