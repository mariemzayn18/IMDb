import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesCatalogComponent } from './movies-catalog/movies-catalog.component';
import { AuthComponent } from './auth/auth.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  {
    path: 'movies-catalog',
    component: MoviesCatalogComponent,
    canActivate: [AuthGuard],
  },
  { path: 'auth', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
