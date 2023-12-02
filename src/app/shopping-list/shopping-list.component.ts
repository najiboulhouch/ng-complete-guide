import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subject, Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit , OnDestroy {
  ingredients: Ingredient[];
  private igChanged : Subscription;


  constructor(private shoppingListService: ShoppingListService, private loggingService : LoggingService) { }

  ngOnDestroy(): void {
    this.igChanged.unsubscribe();
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getShoppingList();
    
    this.igChanged = this.shoppingListService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    }); 

    this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit!');
  }

  onEditItem(index : number){
      this.shoppingListService.startedEdit.next(index);
  }
}
