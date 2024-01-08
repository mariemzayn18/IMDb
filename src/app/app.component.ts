import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './auth/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.translate();
    this.retrieveUserData();
  }

  translate() {
    let lang = localStorage.getItem('lang') || 'en';
    this.translateService.use(lang);
    document.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }

  retrieveUserData() {
    this.authService.retrieveUserData();
  }
}
