import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    selector : '[appPlaceHolder]' ,
    standalone : true , 
})
export class PlaceHolderDirective {

    constructor (public viewContainerRef : ViewContainerRef){
        console.log(viewContainerRef);
    }

    

}