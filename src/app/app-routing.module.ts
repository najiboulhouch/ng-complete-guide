import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { NgModule } from "@angular/core";



const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: "full" },
    { path : 'recipes' , loadChildren : () => import('./recipes/recipes-routing').then(m => m.RECIPES_ROUTES)},
    { path : 'shopping-list' , 
    loadChildren : () => import('./shopping-list/shopping-list-routing').then(m => m.SHOPPING_LIST_ROYTES)},
    { path : 'auth' , loadComponent : () => import('./auth/auth.component').then(m => m.AuthComponent)}

];  


@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}