import { bootstrapApplication } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { AppRoutingModule } from './app/app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ShoppingListService } from './app/shopping-list/shopping-list.service';
import { RecipeService } from './app/recipes/recipe.service';
import { AuthInterceptorService } from './app/auth/auth-interceptor.service';



bootstrapApplication(AppComponent , {
  providers : [
        ShoppingListService,
        RecipeService,
    provideHttpClient(
      withInterceptorsFromDi() ,
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
  },
    importProvidersFrom(AppRoutingModule)
  ]
})



