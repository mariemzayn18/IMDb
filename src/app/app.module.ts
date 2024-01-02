import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MoviesCatalogComponent } from './movies-catalog/movies-catalog.component';
import { AuthComponent } from './auth/auth.component';
import { MovieDetailsComponent } from './movies-catalog/movie-details/movie-details.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { DangerAlertComponent } from './shared/danger-alert/danger-alert.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MoviesCatalogComponent,
    AuthComponent,
    MovieDetailsComponent,
    LoadingSpinnerComponent,
    DangerAlertComponent,
    HomePageComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [
    provideClientHydration(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
