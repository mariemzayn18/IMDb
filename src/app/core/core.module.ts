import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CoreRoutingModule } from './core-routing.module';

import { HomePageComponent } from './home-page/home-page.component';
import { MoviesModule } from './movies/movies.module';

@NgModule({
  declarations: [HomePageComponent],
  imports: [CommonModule, RouterModule, CoreRoutingModule, MoviesModule],
  exports: [HomePageComponent],
})
export class CoreModule {}
