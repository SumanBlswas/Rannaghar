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
  Link,
  SimpleGrid,
} from "@chakra-ui/react";
import { getParamsRecipe } from "../api/recipeApi";

// Define a TypeScript interface for the recipe data
interface Recipe {
  id: number;
  title: string;
  image: string;
  summary: string;
  extendedIngredients: {
    id: number;
    originalString: string;
    name: string; // Add 'name' property
    image: string; // Add 'image' property
  }[];
  analyzedInstructions: {
    name: string;
    steps: {
      number: number;
      step: string;
      ingredients: {
        id: number;
        name: string;
        localizedName: string;
        image: string;
      }[];
      equipment: {
        id: number;
        name: string;
        localizedName: string;
        image: string;
      }[];
      length?: {
        number: number;
        unit: string;
      };
    }[];
  }[];
  cuisines: string[];
  servings: number;
  readyInMinutes: number;
  diets: string[];
  winePairing: {
    pairedWines: string[];
    pairingText: string;
    productMatches: {
      id: number;
      title: string;
      description: string;
      price: string;
      imageUrl: string;
      averageRating: number;
      ratingCount: number;
      score: number;
      link: string;
    }[];
  };
}

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    // Fetch recipe details from the Spoonacular API
    getParamsRecipe(id)
      .then((data: Recipe) => {
        setRecipe(data);
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
        <div dangerouslySetInnerHTML={renderHTML(recipe.summary)} />
      </Text>

      <Divider mb={4} />

      <Heading as="h2" size="lg" mb={2}>
        Ingredients:
      </Heading>
      <SimpleGrid columns={2} spacing={4}>
        {recipe.extendedIngredients.map((ingredient) => (
          <Box key={ingredient.id}>
            <Image
              src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
              alt={ingredient.name}
              maxH="100px"
            />
            <Text fontSize="lg">{ingredient.name}</Text>
          </Box>
        ))}
      </SimpleGrid>

      <Divider mt={4} mb={4} />

      <Heading as="h2" size="lg" mb={2}>
        Instructions:
      </Heading>
      {recipe.analyzedInstructions.map((instruction, index) => (
        <Box key={index} mb={4}>
          <Text fontSize="lg" mb={2}>
            <strong>{instruction.name}</strong>
          </Text>
          <ol>
            {instruction.steps.map((step) => (
              <li key={step.number}>
                {step.step}
                {step.ingredients.length > 0 && (
                  <div>
                    <strong>Ingredients:</strong>{" "}
                    {step.ingredients
                      .map((ingredient) => ingredient.localizedName)
                      .join(", ")}
                  </div>
                )}
                {step.equipment.length > 0 && (
                  <div>
                    <strong>Equipment:</strong>{" "}
                    {step.equipment
                      .map((equipment) => equipment.localizedName)
                      .join(", ")}
                  </div>
                )}
                {step.length && (
                  <div>
                    <strong>Cooking Time:</strong> {step.length.number}{" "}
                    {step.length.unit}
                  </div>
                )}
              </li>
            ))}
          </ol>
        </Box>
      ))}

      <Divider mt={4} mb={4} />

      <Heading as="h2" size="lg" mb={2}>
        Wine Pairing:
      </Heading>
      <VStack align="start" spacing={4}>
        <Text fontSize="lg">
          <strong>Paired Wines:</strong>{" "}
          {recipe.winePairing.pairedWines.join(", ")}
        </Text>
        <Text fontSize="lg">
          <strong>Pairing Text:</strong> {recipe.winePairing.pairingText}
        </Text>
        <Text fontSize="lg">
          <strong>Recommended Wine:</strong>{" "}
          {recipe.winePairing.productMatches[0].title}
        </Text>
        <Image
          src={recipe.winePairing.productMatches[0].imageUrl}
          alt="Wine"
          maxH="200px"
        />
        <Text fontSize="lg">
          <strong>Price:</strong> {recipe.winePairing.productMatches[0].price}
        </Text>
        <Text fontSize="lg">
          <strong>Rating:</strong>{" "}
          {recipe.winePairing.productMatches[0].averageRating} (Based on{" "}
          {recipe.winePairing.productMatches[0].ratingCount} ratings)
        </Text>
        <Link
          fontSize="lg"
          href={recipe.winePairing.productMatches[0].link}
          target="_blank"
          rel="noopener noreferrer"
        >
          Buy Wine
        </Link>
      </VStack>
    </Box>
  );
};

export default RecipeDetails;
