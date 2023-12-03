import { Component, EventEmitter, Output , OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import {Router , ActivatedRoute} from '@angular/router'
import { Subscription } from 'rxjs';
import { RecipesItemComponent } from './recipes-item/recipes-item.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-recipes-list',
  standalone : true ,
  imports : [RecipesItemComponent , NgFor],
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit , OnDestroy {
    recipes : Recipe [];
    private subscription : Subscription ;

    constructor(private recipeService : RecipeService , 
      private router : Router , private route : ActivatedRoute){
    }
    
  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.subscription = this.recipeService.recipeChanged.subscribe(
      recipes => {
        this.recipes = recipes;
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onNewRecipe(){
      this.router.navigate(['new'] , {relativeTo : this.route});
  }


}
