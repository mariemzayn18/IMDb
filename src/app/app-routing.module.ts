import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { MoviesCatalogComponent } from './movies-catalog/movies-catalog.component';
import { AuthComponent } from './auth/auth.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MovieDetailsComponent } from './movies-catalog/movie-details/movie-details.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  {
    path: 'movies-catalog',
    component: MoviesCatalogComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'movie/:id/:name',
    component: MovieDetailsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'auth', component: AuthComponent },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
