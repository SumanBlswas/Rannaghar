import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import RecipeCard from "./RecipeCard";
import { RecipeListProps } from "../Types/types";

const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
  return (
    <Flex justifyContent={"center"} flexWrap={"wrap"} gap={7} mt={5} mb={5}>
      {recipes.map((recipe, index) => (
        <Box key={index}>
          <RecipeCard recipe={recipe} />
        </Box>
      ))}
    </Flex>
  );
};

export default RecipeList;
