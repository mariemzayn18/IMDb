import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MoviesCatalogComponent } from './movies-catalog/movies-catalog.component';
import { RegistrationComponent } from './registration/registration.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { DangerAlertComponent } from './shared/danger-alert/danger-alert.component';
import { HomePageComponent } from './home-page/home-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MoviesCatalogComponent,
    RegistrationComponent,
    MovieDetailsComponent,
    LoadingSpinnerComponent,
    DangerAlertComponent,
    HomePageComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
