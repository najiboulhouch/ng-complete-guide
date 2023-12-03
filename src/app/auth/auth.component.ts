import { Component, ComponentFactory, ComponentFactoryResolver, OnDestroy, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService , AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PlaceHolderDirective } from 'src/app/shared/placeholder/placeholder.directive';
import { NgIf } from '@angular/common';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-auth',
  standalone : true,
  imports : [NgIf, FormsModule , PlaceHolderDirective , LoadingSpinnerComponent],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false ;
  error : string = null;
  @ViewChild(PlaceHolderDirective) alertHost : PlaceHolderDirective;
  private closeSub : Subscription;


  constructor(private authService: AuthService , private router : Router,
    private componentFactoryResolver : ComponentFactoryResolver) { }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }


  onSubmit(form: NgForm) {

    if (form.invalid) {
      return
    } else {
      const email = form.value.email;
      const password = form.value.password;

      let authObs : Observable<AuthResponseData>;

      this.isLoading = true;

      if (this.isLoginMode) {
        authObs = this.authService.login(email , password);
      } else {
        authObs = this.authService.signup(email, password);
      }

      authObs.subscribe({
        next : () => {
          this.isLoading = false;
          this.router.navigate(['/recipes']);
        } , 
        error : (errorMessage) => {
          this.error = errorMessage ;
          this.showErrorAlert(errorMessage);
          this.isLoading = false;
        } 
      })

      this.error = null;
      form.reset();
    }

  }


  onHandleError(){
    this.error = null;
  }

  private showErrorAlert(errorMessage : string){
    //const alertCmp = new AlertComponent();
    //const alertCmpFactory =  this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(AlertComponent);
    componentRef.instance.message = errorMessage;
    this.closeSub = componentRef.instance.close.subscribe(() => {
        this.closeSub.unsubscribe(); 
        hostViewContainerRef.clear();
    });
  }

  ngOnDestroy(): void {
    if(this.closeSub){
      this.closeSub.unsubscribe();  
    }
  }

}
