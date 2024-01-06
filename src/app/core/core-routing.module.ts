import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomePageComponent } from './home-page/home-page.component';
import { AuthGuard } from '../auth/services/auth-guard.service';
import { MoviesComponent } from './movies/movies.component';
import { MoviesResolver } from './services/movies-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'movies',
    component: MoviesComponent,
    canActivate: [AuthGuard],
    resolve: [MoviesResolver],
    loadChildren: () =>
      import('./movies/movies-routing').then((m) => m.MoviesRoutingModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
