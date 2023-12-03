import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map, tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {

    private readonly backendURL = environment.backendURL;

    constructor(private http: HttpClient, private recipeService: RecipeService) { }


    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put<Recipe[]>(this.backendURL + 'recipes.json', recipes, {
            headers: new HttpHeaders({ 'Custom-Id': 'TEST' }),
            params: new HttpParams().set('pretty', 'true')
        }).subscribe(response => {
            console.log(response);
        });
    }

    fetchRecipes(): Observable<Recipe[]> {
        return this.http.get<Recipe[]>(this.backendURL + 'recipes.json')
        .pipe(
            map(recipes => {
                if(recipes){
                    return recipes.map(recipe => {
                        return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
                    });
                } else {
                    return null;
                }
               
            }),
            tap(recipes => {
                if(recipes) {
                    this.recipeService.setRecipes(recipes);
                }
            })
        )
    }


}