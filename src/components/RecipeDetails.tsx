import React from "react";
import { Box, Text } from "@chakra-ui/react";

export interface Recipe {
  title: string;
  image: string;
  summary: string;
  ingredients: string[];
  instructions: string;
}

interface RecipeDetailsProps {
  recipe: Recipe;
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({ recipe }) => {
  return (
    <Box>
      <img src={recipe.image} alt={recipe.title} />
      <h2>{recipe.title}</h2>
      <Text>{recipe.summary}</Text>
      <h3>Ingredients:</h3>
      {recipe.ingredients && recipe.ingredients.length > 0 ? (
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      ) : (
        <p>No ingredients available.</p>
      )}
      <h3>Instructions:</h3>
      <p>{recipe.instructions}</p>
    </Box>
  );
};

export default RecipeDetails;
