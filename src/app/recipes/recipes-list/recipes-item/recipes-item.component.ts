import { Component , Input } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recipes-item',
  standalone : true,
  imports : [RouterModule],
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.css']
})
export class RecipesItemComponent {

   @Input() recipe : Recipe ;

}
