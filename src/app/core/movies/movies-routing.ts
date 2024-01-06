import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../../auth/services/auth-guard.service';
import { MoviesResolver } from '../services/movies-resolver.service';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { TopMoviesCatalogComponent } from './top-movies-catalog/top-movies-catalog.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    resolve: [MoviesResolver],
    children: [
      {
        path: 'top-movies-catalog',
        component: TopMoviesCatalogComponent,
      },
      {
        path: ':id/:name',
        component: MovieDetailsComponent,
      },
      {
        path: '**',
        redirectTo: '/movies/top-movies-catalog',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviesRoutingModule {}
