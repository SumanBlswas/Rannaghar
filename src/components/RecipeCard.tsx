import { Box, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Recipe } from "../Types/types";

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  const navigate = useNavigate();
  return (
    <Box
      maxW="xs"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      h={"100%"}
      onClick={() => navigate(`/recipe_details/${recipe.id}`)}
      className={"recipe_card"}
      cursor={"pointer"}
    >
      <Image src={recipe.image} alt={recipe.title} />
      <Box p="4">
        <Text fontSize="17.2px" textAlign={"center"} fontWeight="medium" mb="2">
          {recipe.title.split(" ").splice(0, 5).join(" ")}
        </Text>
        {/* <VStack align="start" spacing="1" mb="4">
          <Text fontSize="md" fontWeight="bold">
            Ingredients:
          </Text>
          {recipe.ingredients.map((ingredient, index) => (
            <Text key={index}>{ingredient}</Text>
          ))}
        </VStack>
        <HStack justifyContent="space-between">
          <Text fontSize="md" fontWeight="bold">
            Instructions:
          </Text>
          <Text fontSize="md" color="gray.500">
            {instructions}
          </Text>
        </HStack> */}
      </Box>
    </Box>
  );
};

export default RecipeCard;
