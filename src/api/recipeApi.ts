import axios from "axios";

const apiKey = "4c4fa0293ab546dfa186a5b7303c6f0d";

export const getRandomRecipes = async (number: number) => {
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=${number}`
    );
    const recipes = response.data.recipes;
    return recipes;
  } catch (error) {
    console.error("Error fetching random recipes:", error);
    return [];
  }
};

export const searchRecipes = async (query: string) => {
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}`
    );
    const recipes = response.data.results;
    return recipes;
  } catch (error) {
    console.error("Error searching for recipes:", error);
    return [];
  }
};
