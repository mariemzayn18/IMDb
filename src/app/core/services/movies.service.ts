import { Injectable } from '@angular/core';
import { Movie } from '../movies/models/movie.model';
import { Genre } from '../movies/models/genre.model';

@Injectable({ providedIn: 'root' })
export class MoviesService {
  private topMovies: Movie[] = [];
  private movieGenres: Genre[] = [];

  constructor() {}

  //------------ Movies
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

  //------------ Genres
  setMovieGenres(genre: Genre[]) {
    this.movieGenres = genre;
  }

  get genres() {
    return this.movieGenres.slice();
  }

  mapGenresIds() {
    this.topMovies.map((movie) => {
      movie.genre = movie.genre.map((genreId) => {
        const foundGenre = this.genres.find((genre) => genre.id === genreId);
        return foundGenre ? foundGenre.name : '';
      });
    });
  }
}
