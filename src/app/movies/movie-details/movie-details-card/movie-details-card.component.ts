import { Component, Input } from '@angular/core';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-details-card',
  templateUrl: './movie-details-card.component.html',
  styleUrl: './movie-details-card.component.css',
})
export class MovieDetailsCardComponent {
  @Input() movie: Movie = {} as Movie;
  @Input() movieYear: number = 0;
}
