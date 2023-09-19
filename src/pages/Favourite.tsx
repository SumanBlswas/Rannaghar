import axios from "axios";
import { useEffect, useState } from "react";

const Favourite = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const getFavRecipes = async () => {
      try {
        const favRecipe = await axios.get(`http://localhost:7000/fav-recipe`);
        console.log(favRecipe);
      } catch (error) {
        console.log(error);
      }
    };
    getFavRecipes();
  }, []);
  return <div>Favourite</div>;
};

export default Favourite;
