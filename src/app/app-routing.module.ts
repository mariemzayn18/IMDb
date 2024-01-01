import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesCatalogComponent } from './movies-catalog/movies-catalog.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  { path: 'movies-catalog', component: MoviesCatalogComponent },
  { path: 'registration', component: RegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
