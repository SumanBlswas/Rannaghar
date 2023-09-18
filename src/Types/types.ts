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

export interface RecipeExtend {
  id: number;
  title: string;
  image: string;
  summary: string;
  extendedIngredients: {
    id: number;
    originalString: string;
    name: string;
    image: string;
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
  dishTypes: string[];
  occasions: string[];
}
