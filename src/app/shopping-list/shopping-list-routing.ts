import { NgModule } from "@angular/core";
import { Route, RouterModule, Routes } from "@angular/router";
import { ShoppingListComponent } from "./shopping-list.component";


export const SHOPPING_LIST_ROYTES : Route[] = [
    { path: '', component: ShoppingListComponent },
];
