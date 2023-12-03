import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  standalone : true ,
  template: '<div class="lds-facebook"><div></div><div></div><div></div></div>',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent {
  
}
