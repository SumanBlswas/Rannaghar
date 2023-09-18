import axios from "axios";

// const apiKey = "4c4fa0293ab546dfa186a5b7303c6f0d";
const apiKey = "b73f92156bd04194ba69158010080215";

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

export const getParamsRecipe = async (id: string | undefined) => {
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`
    );
    const recipe = response.data;
    return recipe;
  } catch (error) {
    console.log(error);
    return [];
  }
};
