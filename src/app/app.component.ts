import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { LoggingService } from './logging.service';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone : true ,
  imports : [HeaderComponent , RouterModule], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private authService : AuthService , private loggingService : LoggingService){}

  ngOnInit(): void {
    this.authService.autoLogin();
    this.loggingService.printLog('Hello from AppComponent ngOnInit');

  }
}
