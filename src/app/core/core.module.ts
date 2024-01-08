import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../shared/shared.module';
import { CoreRoutingModule } from './core-routing.module';
import { ActorsCardsComponent } from './movies/movie-details/actors-cards/actors-cards.component';
import { MovieDetailsCardComponent } from './movies/movie-details/movie-details-card/movie-details-card.component';
import { MovieDetailsComponent } from './movies/movie-details/movie-details.component';
import { TopMoviesCatalogComponent } from './movies/top-movies-catalog/top-movies-catalog.component';


@NgModule({
  declarations: [
    TopMoviesCatalogComponent,
    MovieDetailsComponent,
    ActorsCardsComponent,
    MovieDetailsCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxPaginationModule,
    SharedModule,
    CoreRoutingModule,
  ],

  exports: [
    TopMoviesCatalogComponent,
    MovieDetailsComponent,
    ActorsCardsComponent,
    MovieDetailsCardComponent,
  ],
})
export class CoreModule {}
