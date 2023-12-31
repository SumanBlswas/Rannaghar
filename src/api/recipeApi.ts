import axios from "axios";

// const apiKey = "4c4fa0293ab546dfa186a5b7303c6f0d";
const apiKey = "b73f92156bd04194ba69158010080215";
// const apiKey = "c5d8a4c11fc1426ea23993ebe8950908";
// const apiKey = "650fa6135e7945b991bf5faa02ffdb0c";

export const getRandomRecipes = async (number: number, page: number) => {
  try {
    const offset = (page - 1) * number;
    const response = await axios.get(
      `${import.meta.env.VITE_THIRD_PARTY_PORT}/recipes/random?apiKey=${apiKey}&number=${number}&offset=${offset}`
    );
    const recipes = response.data.recipes;
    return recipes;
  } catch (error) {
    console.error("Error fetching random recipes:", error);
    return [];
  }
};

export const searchRecipes = async (
  query: string,
  page: number,
  number: number
) => {
  try {
    const offset = (page - 1) * number;
    const response = await axios.get(
      `${import.meta.env.VITE_THIRD_PARTY_PORT}/recipes/complexSearch?apiKey=${apiKey}&query=${query}&number=${number}&offset=${offset}`
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
      `${import.meta.env.VITE_THIRD_PARTY_PORT}/recipes/${id}/information?apiKey=${apiKey}`
    );
    const recipe = response.data;
    return recipe;
  } catch (error) {
    console.log(error);
    return [];
  }
};
