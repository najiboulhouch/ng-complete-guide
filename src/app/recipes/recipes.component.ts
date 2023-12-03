import { Component, OnInit } from '@angular/core';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recipes',
  standalone : true,
  imports : [RecipesListComponent , RouterModule],
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'] 
})
export class RecipesComponent implements OnInit {

  constructor(){}

  ngOnInit(): void {
    
  }

  

}
