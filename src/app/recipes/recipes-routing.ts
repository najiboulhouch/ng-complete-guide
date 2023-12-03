import { NgModule } from "@angular/core";
import { Route, RouterModule, Routes } from "@angular/router";
import { RecipesComponent } from "./recipes.component";
import { AuthGuard } from "../auth/auth.guard";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipesDetailComponent } from "./recipes-detail/recipes-detail.component";
import { recipesResolverService } from "./recipes-resolver-service";

export const RECIPES_ROUTES : Route[] = [
    {
        path: '', component: RecipesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: RecipeStartComponent },
            { path: 'new', component: RecipeEditComponent} ,
            { path: ':id', component: RecipesDetailComponent, resolve: { data: recipesResolverService } },
            { path: ':id/edit', component: RecipeEditComponent, resolve: { data: recipesResolverService } },
        ]
    },
]
