import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { Movie } from './models/movie.model';
import { Genre } from './models/genre.model';

@Injectable({ providedIn: 'root' })
export class MoviesService {
  private topMovies: Movie[] = [];
  private movieGenres: Genre[] = [];

  constructor(private http: HttpClient) {}

  //------------ Movies
  setTopMovies(movies: Movie[]) {
    this.topMovies = movies;
  }

  get movies() {
    return this.topMovies.slice();
  }

  getMovieDetails(movieId: number) {
    return this.topMovies.find((movie) => movie.id === movieId);
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

  //------------ Actors
  getMovieActors(movieId: number) {}
}
