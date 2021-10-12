import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { AuthService } from './core/auth.sevice';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'test';
  spinner:boolean;
  constructor(public router: Router, public authService: AuthService,private translate: TranslateService ) { 
    translate.setDefaultLang('en');
    this.spinner=true;
    setTimeout(() => {
      this.spinner=false
    }, 2000);
  }
  switchLanguage(language: string) {
    this.translate.use(language);
    this.translate.setDefaultLang(language)
  }
}
