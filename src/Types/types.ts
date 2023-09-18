export interface Recipe {
  id: string;
  title: string;
  image: string;
  summary: string;
  ingredients: string[];
  instructions: string;
}

export interface RecipeDetailsProps {
  recipe: Recipe;
}

export interface RecipeListProps {
  recipes: Recipe[];
}
