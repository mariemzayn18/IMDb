import { RegistrationService } from './registration/registration.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'IMDb';

  constructor(private registrationService: RegistrationService) {}

  ngOnInit() {
    this.registrationService.retrieveUserData();
  }
}
