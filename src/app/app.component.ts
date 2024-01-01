import { RegistrationService } from './registration/registration.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'IMDb';

  isDataLoaded = false; // Track the loading status

  constructor(private registrationService: RegistrationService) {}

  ngOnInit() {
    this.registrationService.retrieveUserData();
    this.isDataLoaded = this.registrationService.isDataLoaded;
  }
}
