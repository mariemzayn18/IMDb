import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../auth/services/auth-guard.service';
import { MovieDetailsComponent } from './movies/movie-details/movie-details.component';
import { TopMoviesCatalogComponent } from './movies/top-movies-catalog/top-movies-catalog.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'top-movies-catalog',
        component: TopMoviesCatalogComponent,
      },
      {
        path: ':id/:name',
        component: MovieDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
