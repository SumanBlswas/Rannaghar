import React from "react";
import { Box } from "@chakra-ui/react";

export interface Recipe {
  title: string;
  image: string;
  summary: string;
  ingredients: string[];
  instructions: string;
}

interface RecipeListProps {
  recipes: Recipe[];
  onSelect: (recipe: Recipe) => void;
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes, onSelect }) => {
  return (
    <Box>
      {recipes.map((recipe, index) => (
        <div key={index}>
          <img src={recipe.image} alt={recipe.title} />
          <h2>{recipe.title}</h2>
          <p>{recipe.summary}</p>
          <button onClick={() => onSelect(recipe)}>View Details</button>{" "}
        </div>
      ))}
    </Box>
  );
};

export default RecipeList;
