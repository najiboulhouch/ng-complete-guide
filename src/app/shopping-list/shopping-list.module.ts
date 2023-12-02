import { NgModule } from "@angular/core";
import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ShoppingListRoutingModule } from "./shopping-list-routing";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { LoggingService } from "../logging.service";

@NgModule({
    declarations : [
        ShoppingListComponent,
        ShoppingEditComponent 
    ],
    imports : [ 
        RouterModule,
        FormsModule, 
        ShoppingListRoutingModule,
        SharedModule
    ] ,
    providers : [
        LoggingService
    ]
})
export class ShoppingListModule {

}