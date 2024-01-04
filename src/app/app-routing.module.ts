import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/services/auth-guard.service';
import { UnauthGuard } from './auth/services/unauth-guard.service';
import { MoviesResolver } from './core/services/movies-resolver.service';
import { AuthComponent } from './auth/auth.component';
import { HomePageComponent } from './core/home-page/home-page.component';

import { MoviesComponent } from './core/movies/movies.component';
import { MovieDetailsComponent } from './core/movies/movie-details/movie-details.component';
import { TopMoviesCatalogComponent } from './core/movies/top-movies-catalog/top-movies-catalog.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'auth', component: AuthComponent, canActivate: [UnauthGuard] },
  {
    path: 'movies',
    component: MoviesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'top-movies-catalog',
        component: TopMoviesCatalogComponent,
        resolve: [MoviesResolver],
      },
      {
        path: ':id/:name',
        component: MovieDetailsComponent,
        resolve: [MoviesResolver],
      },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
