import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  lang = 'en';
  private userSubscriber: Subscription = new Subscription();

  constructor(
    public authService: AuthService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.getLang(); // to set the language
    this.checkIfLoggedIn(); // to exchange the login/logout button
  }

  checkIfLoggedIn() {
    this.userSubscriber = this.authService.user.subscribe((user) => {
      this.isLoggedIn = !!user;
    });
  }

  getLang() {
    this.lang = localStorage.getItem('lang') || 'en';
  }

  changeLang(event: any) {
    let lang = event.target.value;
    localStorage.setItem('lang', lang);
    this.translateService.use(localStorage.getItem('lang') || 'en');
    document.dir = lang === 'ar' ? 'rtl' : 'ltr';
    window.location.reload();
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSubscriber.unsubscribe();
  }
}
