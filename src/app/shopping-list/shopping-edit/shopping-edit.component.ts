import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  standalone : true ,
  imports : [FormsModule],
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('shoppingListForm') shoppingListForm: NgForm;
  private subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEdit.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.shoppingListForm.setValue({
          'name': this.editedItem.name,
          'amount': this.editedItem.amount
        })
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  constructor(private shoppingListService: ShoppingListService) { }

  onSubmit() {
    const ingName = this.shoppingListForm.value.name;
    const ingAmount = this.shoppingListForm.value.amount;
    const ingredient = new Ingredient(ingName, ingAmount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, ingredient);
    } else {
      this.shoppingListService.addIngredient(ingredient);
    }
    this.editMode = false;
    this.shoppingListForm.reset();
  }

  onClear() {
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }



}
