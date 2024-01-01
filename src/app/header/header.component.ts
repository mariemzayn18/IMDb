import { Subscription } from 'rxjs';
import { RegistrationService } from './../registration/registration.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  private userSubscriber: Subscription = new Subscription();

  constructor(public registrationService: RegistrationService) {}

  ngOnInit() {
    this.userSubscriber = this.registrationService.user.subscribe((user) => {
      this.isLoggedIn = !!user;
    });
  }

  logout() {
    this.registrationService.logout();
  }

  ngOnDestroy() {
    this.userSubscriber.unsubscribe();
  }
}
