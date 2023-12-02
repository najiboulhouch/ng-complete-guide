import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {

  recipeChanged = new Subject<Recipe[]>;

  constructor(private slService: ShoppingListService) { }

  // private recipes: Recipe[] = [
  //   new Recipe(1, 'A Test Recipe 1', 'This is simply a test for 1',
  //     'https://www.foodandwine.com/thmb/fVmYbaQzXCz1Prx8VxrW9sMcjMU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Braciole-FT-RECIPE1122-66acf49cef0e4390bec780945709e7f3.jpg',
  //     [
  //       new Ingredient('Meat', 1),
  //       new Ingredient('French Fries', 20)])
  //   ,
  //   new Recipe(2, 'A Test Recipe 2', 'This is simply a test for 2',
  //     'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505'
  //     , [
  //       new Ingredient('Buns', 2),
  //       new Ingredient('Meat', 1)
  //     ]),

  //   new Recipe(3, 'A Test Recipe 3', 'This is simply a test for 3',
  //     'https://www.indianhealthyrecipes.com/wp-content/uploads/2023/08/chole-recipe.jpg'
  //     , [
  //       new Ingredient('Potatoes', 2),
  //       new Ingredient('Test', 1)
  //     ]),
  // ];

  private recipes : Recipe[] = [];

  getRecipes() {
    return this.recipes.slice();
  }

  setRecipes(recipes : Recipe[]){
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  getRecipe(id: number) {
    const recipe = this.recipes.find((recipe) => {
      return recipe.id === id;
    });
    return recipe;
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  updateRecipe(index :  number , newRecipe : Recipe){
        newRecipe.id = index ;
        this.recipes[index - 1] = newRecipe;
        console.log(this.recipes);
        this.recipeChanged.next(this.recipes.slice());
  }

  addRecipe(recipe : Recipe){
    recipe.id = this.recipes.length + 1 ;
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index : number){
    this.recipes.splice(index , 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}