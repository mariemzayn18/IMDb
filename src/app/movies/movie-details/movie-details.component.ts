import { MoviesStorageService } from './../../shared/movies-storage.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../models/movie.model';
import { Actor } from '../models/actor.model';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css',
})
export class MovieDetailsComponent {
  movie: Movie = {} as Movie;
  actors: Actor[] = [];

  movieYear: number = 0;

  constructor(
    private moviesService: MoviesService,
    private moviesStorageService: MoviesStorageService,
    private router: ActivatedRoute
  ) {}

  ngOnInit() {
    const movieId = +this.router.snapshot.params['id'];

    // get movie details
    this.movie = this.moviesService.getMovieDetails(movieId);

    // fetch actors
    this.moviesStorageService.fetchMovieActors(movieId).subscribe((actors) => {
      this.actors = actors.length > 6 ? actors.slice(0, 6) : actors;
    });

    // extract the release year
    this.movieYear = this.extractYear(this.movie.releaseDate);
  }

  extractYear(date: Date) {
    return new Date(date).getFullYear();
  }
}
