import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './core/auth.sevice';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'test';
  spinner:boolean;
  constructor(public router: Router, public authService: AuthService ) { 
    this.spinner=true;
    setTimeout(() => {
      this.spinner=false
    }, 2000);
  }
}
