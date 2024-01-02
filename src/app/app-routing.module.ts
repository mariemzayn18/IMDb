import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AuthComponent } from './auth/auth.component';
import { HomePageComponent } from './home-page/home-page.component';

import { MoviesComponent } from './movies/movies.component';
import { MovieDetailsComponent } from './movies/movie-details/movie-details.component';
import { TopRatedMoviesCatalogComponent } from './movies/top-rated-movies-catalog/top-rated-movies-catalog.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'auth', component: AuthComponent },
  {
    path: 'movies',
    component: MoviesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'top-rated-movies-catalog',
        component: TopRatedMoviesCatalogComponent,
      },
      { path: ':id/:name', component: MovieDetailsComponent },
    ],
  },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
