import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Text,
  Image,
  Flex,
  Heading,
  Badge,
  VStack,
  Divider,
  List,
  ListItem,
} from "@chakra-ui/react";
import { getParamsRecipe } from "../api/recipeApi";

// Define a TypeScript interface for the recipe data
interface Recipe {
  id: number;
  title: string;
  image: string;
  summary: string;
  extendedIngredients: { id: number; originalString: string }[];
  analyzedInstructions: { steps: { number: number; step: string }[] }[];
  cuisines: string[];
  servings: number;
  readyInMinutes: number;
  diets: string[];
}

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    // Fetch recipe details from the Spoonacular API
    getParamsRecipe(id)
      .then((data: Recipe) => {
        setRecipe(data);
        console.log(data);
        
      })
      .catch((error) => {
        console.error("Error fetching recipe details:", error);
      });
  }, [id]);

  if (!recipe) {
    // Render loading state while data is being fetched
    return <Text>Loading...</Text>;
  }

  // Define the renderHTML function within the component
  const renderHTML = (htmlString: string) => {
    return { __html: htmlString };
  };

  return (
    <Box p={4}>
      <Flex justify="space-between">
        <Box>
          <Heading as="h1" size="xl" mb={2}>
            {recipe.title}
          </Heading>
          <Flex align="center" mb={2}>
            <Badge colorScheme="teal">{recipe.diets.join(", ")}</Badge>
            <Badge colorScheme="blue" ml={2}>
              {recipe.cuisines.join(", ")}
            </Badge>
          </Flex>
        </Box>
        <Box>
          <Text fontSize="lg">
            <strong>Ready in:</strong> {recipe.readyInMinutes} minutes
          </Text>
          <Text fontSize="lg">
            <strong>Servings:</strong> {recipe.servings}
          </Text>
        </Box>
      </Flex>

      <Image src={recipe.image} alt={recipe.title} maxH="300px" mb={4} />

      <Text fontSize="lg" mb={4}>
        {/* Render HTML content safely */}
        <Box dangerouslySetInnerHTML={renderHTML(recipe.summary)} />
      </Text>

      <Divider mb={4} />

      <Heading as="h2" size="lg" mb={2}>
        Ingredients:
      </Heading>
      <List spacing={1}>
        {recipe.extendedIngredients.map((ingredient) => (
          <ListItem key={ingredient.id}>{ingredient.originalString}</ListItem>
        ))}
      </List>

      <Divider mt={4} mb={4} />

      <Heading as="h2" size="lg" mb={2}>
        Instructions:
      </Heading>
      <ol>
        {recipe.analyzedInstructions[0]?.steps.map((step) => (
          <li key={step.number}>{step.step}</li>
        ))}
      </ol>
    </Box>
  );
};

export default RecipeDetails;
