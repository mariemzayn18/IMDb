import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActorsCardsComponent } from './movie-details/actors-cards/actors-cards.component';
import { MovieDetailsCardComponent } from './movie-details/movie-details-card/movie-details-card.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MoviesComponent } from './movies.component';
import { TopMoviesCatalogComponent } from './top-movies-catalog/top-movies-catalog.component';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../shared/shared.module';
import { MoviesRoutingModule } from './movies-routing';

@NgModule({
  declarations: [
    MoviesComponent,
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
    MoviesRoutingModule,
  ],

  exports: [
    MoviesComponent,
    TopMoviesCatalogComponent,
    MovieDetailsComponent,
    ActorsCardsComponent,
    MovieDetailsCardComponent,
  ],
})
export class MoviesModule {}
