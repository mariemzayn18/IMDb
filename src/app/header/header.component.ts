import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  private userSubscriber: Subscription = new Subscription();

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.checkIfLoggedIn(); // to exchange the login/logout button
  }

  checkIfLoggedIn() {
    this.userSubscriber = this.authService.user.subscribe((user) => {
      this.isLoggedIn = !!user;
    });
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSubscriber.unsubscribe();
  }
}
