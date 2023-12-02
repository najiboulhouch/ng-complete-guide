import { Directive , ElementRef, HostBinding, HostListener, Renderer2 } from "@angular/core";

@Directive({
    selector : '[appDropdown]'
})
export class DropdownDirective {

    @HostBinding('class.open') isOpen = false;

    constructor(private elRef : ElementRef , private render : Renderer2 ){}

    // @HostListener('click') toggleOpen() {
    //     this.isOpen = !this.isOpen; 
    //     if(this.isOpen) {
    //         this.render.removeClass(this.elRef.nativeElement , 'open');
    //     } else {
    //         this.render.addClass(this.elRef.nativeElement , 'open');
    //     }
    // }
    @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
        this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
      }

}