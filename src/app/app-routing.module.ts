import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { MoviesResolver } from './movies/movies-resolver.service';
import { ActorsResolver } from './movies/actors-resolver.service';
import { AuthComponent } from './auth/auth.component';
import { HomePageComponent } from './home-page/home-page.component';

import { MoviesComponent } from './movies/movies.component';
import { MovieDetailsComponent } from './movies/movie-details/movie-details.component';
import { TopMoviesCatalogComponent } from './movies/top-movies-catalog/top-movies-catalog.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'auth', component: AuthComponent },
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
        resolve: [MoviesResolver, ActorsResolver],
      },
    ],
  },
  { path: '**', redirectTo: '', component: HomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
