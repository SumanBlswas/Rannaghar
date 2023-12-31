import { useEffect, useState } from "react";
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
  Link,
  SimpleGrid,
  Stack,
  Button,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { getParamsRecipe } from "../api/recipeApi";
import { RecipeExtend } from "../Types/types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import axios from "axios";

interface FavoriteRecipe {
  id: string;
  title: string;
  image: string;
  summary: string;
  ingredients: [];
  instructions: [];
}

const RecipeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<RecipeExtend | null>(null);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    getParamsRecipe(id)
      .then((data: RecipeExtend) => {
        setRecipe(data);
      })
      .catch((error) => {
        console.error("Error fetching recipe details:", error);
      });

    axios
      .get<FavoriteRecipe[]>(`${import.meta.env.VITE_PORT}/fav-recipe`)
      .then((response) => {
        const favorites = response.data;
        const isFav = favorites.some((favorite) => favorite.id === id);
        setIsFavorite(isFav);
      })
      .catch((error) => {
        console.error("Error fetching favorite status:", error);
      });
  }, [id]);

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await axios.delete(`${import.meta.env.VITE_PORT}/fav-recipe/${id}`);
      } else {
        await axios.post(`${import.meta.env.VITE_PORT}/fav-recipe`, {
          id: recipe?.id,
          title: recipe?.title,
          image: recipe?.image,
          summary: recipe?.summary,
          ingredients: recipe?.extendedIngredients,
          instructions: recipe?.analyzedInstructions,
        });
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  if (!recipe) {
    return (
      <Center>
        <Spinner size="xl" color="purple" width={"250px"} h={"250px"} mt={24} />
      </Center>
    );
  }

  const renderHTML = (htmlString: string) => {
    return { __html: htmlString };
  };

  return (
    <Box p={4} maxW="1000px" mx="auto">
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align={{ base: "initial", md: "center" }}
      >
        <Box flex="1">
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

        <Flex gap={5}>
          <Box>
            <Button
              onClick={toggleFavorite}
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
              colorScheme={isFavorite ? "red" : "green"} // Change color based on favorite status
            >
              {isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
            </Button>
          </Box>
          <Box flex="1">
            <Text fontSize="lg" textAlign={{ base: "left", md: "right" }}>
              <strong>Ready in:</strong> {recipe.readyInMinutes} minutes
            </Text>
            <Text fontSize="lg" textAlign={{ base: "left", md: "right" }}>
              <strong>Servings:</strong> {recipe.servings}
            </Text>
          </Box>
        </Flex>
      </Flex>

      <Flex
        gap={5}
        placeItems={"center"}
        justifyContent={"space-between"}
        flexWrap={"wrap"}
        pt={{ base: 5, sm: 2 }}
      >
        <Image
          src={recipe.image}
          alt={recipe.title}
          maxH="300px"
          mb={4}
          borderRadius={15}
        />

        <Box textAlign={{ base: "start", sm: "right" }} mb={{ base: 3, sm: 0 }}>
          <Stack spacing={{ base: 1, sm: 4 }}>
            <Heading as="h2" size="lg">
              Dish Types:
            </Heading>
            <Text fontSize="lg">{recipe.dishTypes.join(", ")}</Text>
          </Stack>

          <Stack spacing={{ base: 1, sm: 4 }}>
            <Heading as="h2" size="lg">
              Occasions:
            </Heading>
            <Text fontSize="lg">
              {recipe.occasions.length > 0
                ? recipe.occasions.join(", ")
                : "Happy"}
            </Text>
          </Stack>
        </Box>
      </Flex>

      <Box
        fontSize="lg"
        mb={4}
        dangerouslySetInnerHTML={renderHTML(recipe.summary)}
      />

      <Divider mb={4} />

      <Stack spacing={4}>
        <Heading as="h2" size="lg">
          Ingredients:
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          {recipe.extendedIngredients.map((ingredient, index) => (
            <Box key={index} textAlign="center">
              <Image
                src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
                alt={ingredient.name}
                maxH="100px"
                mx="auto"
              />
              <Text fontSize="lg">{ingredient.name}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Stack>

      <Divider mt={4} mb={4} />

      <Stack spacing={4} p={{ base: 5, sm: 0 }}>
        <Heading as="h2" size="lg">
          Instructions:
        </Heading>
        {recipe.analyzedInstructions.map((instruction, index) => (
          <Box key={index} mb={4}>
            <Text fontSize="lg" mb={2}>
              <strong>{instruction.name}</strong>
            </Text>
            <ol>
              {instruction.steps.map((step, index) => (
                <li key={index}>
                  {step.step}
                  {step.ingredients.length > 0 && (
                    <Box>
                      <strong>Ingredients:</strong>{" "}
                      {step.ingredients
                        .map((ingredient) => ingredient.localizedName)
                        .join(", ")}
                    </Box>
                  )}
                  {step.equipment.length > 0 && (
                    <Box>
                      <strong>Equipment:</strong>{" "}
                      {step.equipment
                        .map((equipment) => equipment.localizedName)
                        .join(", ")}
                    </Box>
                  )}
                  {step.length && (
                    <Box>
                      <strong>Cooking Time:</strong> {step.length.number}{" "}
                      {step.length.unit}
                    </Box>
                  )}
                </li>
              ))}
            </ol>
          </Box>
        ))}
      </Stack>

      <Divider mt={4} mb={4} />

      {recipe.winePairing.pairingText &&
      recipe.winePairing.pairingText !== "" ? (
        <Stack spacing={4}>
          <Heading as="h2" size="lg">
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
            <Flex
              placeItems={"center"}
              gap={{ base: 5, sm: 20 }}
              justifyContent={"space-between"}
            >
              <Image
                src={recipe.winePairing.productMatches[0].imageUrl}
                alt="Wine"
                maxH="200px"
              />
              <Flex flexDir={"column"} gap={3}>
                <Text fontSize="lg">
                  <strong>Price:</strong>{" "}
                  {recipe.winePairing.productMatches[0].price.split(".")[0]}
                </Text>
                <Text fontSize="lg">
                  <strong>Rating:</strong>{" "}
                  {recipe.winePairing.productMatches[0].averageRating.toFixed(
                    2
                  )}{" "}
                  (Based on {recipe.winePairing.productMatches[0].ratingCount}{" "}
                  ratings)
                </Text>
                <Button
                  as={Link}
                  fontSize="lg"
                  href={recipe.winePairing.productMatches[0].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  colorScheme={"blue"}
                  className={"buy_wine_button"}
                >
                  Buy Wine
                </Button>
              </Flex>
            </Flex>
          </VStack>
        </Stack>
      ) : (
        <Box></Box>
      )}
    </Box>
  );
};

export default RecipeDetails;
