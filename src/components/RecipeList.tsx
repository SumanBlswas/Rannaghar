import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import RecipeCard from "./RecipeCard";

export interface Recipe {
  title: string;
  image: string;
  summary: string;
  ingredients: string[];
  instructions: string;
}

interface RecipeListProps {
  recipes: Recipe[];
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
  return (
    <Flex justifyContent={"center"} flexWrap={"wrap"} gap={7}>
      {recipes.map((recipe, index) => (
        <div key={index}>
          <RecipeCard recipe={recipe} />
        </div>
      ))}
    </Flex>
  );
};

export default RecipeList;
