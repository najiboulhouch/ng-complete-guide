import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute , Params , Router} from '@angular/router'
import { NgFor, NgIf } from '@angular/common';
import { DropdownDirective } from 'src/app/shared/dropdown.directive';

@Component({
  selector: 'app-recipes-detail',
  standalone : true,
  imports : [NgIf , DropdownDirective , NgFor],
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {

  recipeDetail : Recipe ;


 constructor(private recipeService : RecipeService ,
             private route : ActivatedRoute , private router : Router){}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params : Params) => {
        this.recipeDetail = this.recipeService.getRecipe(+params['id']);
      }
    )
  }

 onAddToShppingList(){
  this.recipeService.addIngredientsToShoppingList(this.recipeDetail.ingredients);
 }

 onEditRecipe(){
//  this.router.navigate(['edit'] , {relativeTo : this.route});
  this.router.navigate(['../' , this.recipeDetail.id , 'edit'] , {relativeTo : this.route});
 }

 onDeleteRecipe(){
  this.recipeService.deleteRecipe(this.recipeDetail.id - 1);
  this.router.navigate(['../'] , {relativeTo : this.route});
 }
}
