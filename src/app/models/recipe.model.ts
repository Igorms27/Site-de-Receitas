export interface Recipe {
  recipe: {
    label: string;
    image: string;
    url: string;
    ingredientLines: string[];
    calories: number;
  };
}