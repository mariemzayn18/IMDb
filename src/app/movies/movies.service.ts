import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { Movie } from './models/movie.model';
import { Genres } from './models/genres.model';

@Injectable({ providedIn: 'root' })
export class MoviesService {
  private topMovies: Movie[] = [];

  constructor(private http: HttpClient) {}

  setTopMovies(movies: Movie[]) {
    this.topMovies = movies;
  }

  get movies() {
    return this.topMovies.slice();
  }


  getMovieDetails(movieId: number) {
    return this.topMovies.find((movie) => movie.id === movieId);
  }

  getMovieGenres() {}

  getMovieActors(movieId: number) {}
}
