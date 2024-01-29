import { Injectable } from '@angular/core';
import { Movie } from '../movies/models/movie.model';
import { Genre } from '../movies/models/genre.model';

@Injectable({ providedIn: 'root' })
export class MoviesService {
  private topMovies: Movie[] = [];
  private movieGenres: Genre[] = [];

  constructor() {}

  setTopMovies(movies: Movie[]) {
    this.topMovies = movies;
  }

  get movies() {
    return this.topMovies.slice();
  }

  getMovieDetails(movieId: number) {
    const movie = this.topMovies.find((movie) => movie.id === movieId);
    if (movie) {
      return movie;
    }
    return {} as Movie;
  }

  
}
