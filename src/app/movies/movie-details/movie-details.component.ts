import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../movies.service';
import { Movie } from '../models/movie.model';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css',
})
export class MovieDetailsComponent {
  movie: Movie = {} as Movie;
  movieYear: number = 0;

  constructor(
    private moviesService: MoviesService,
    private router: ActivatedRoute
  ) {}

  ngOnInit() {
    const movieId = +this.router.snapshot.params['id'];
    this.movie = this.moviesService.getMovieDetails(movieId);
    this.movieYear = this.extractYear(this.movie.releaseDate);
  }

  extractYear(date: Date) {
    return new Date(date).getFullYear();
  }
}
