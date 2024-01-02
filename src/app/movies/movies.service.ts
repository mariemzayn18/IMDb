import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { Movie } from './models/movie.model';
import { Genres } from './models/genres.model';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient, private router: Router) {}

  fetchTopMovies() {
    return this.http
      .get<Movie[]>(
        environment.movieDBBaseUrl +
          'movie/top_rated?api_key=' +
          environment.movieDBAPIKey
      )
      .pipe(
        map((res: any) => {
          return res.results;
        })
      );
  }

  getMovieDetails(movieId: number) {}

  fetchMovieGenres() {
    return this.http
      .get<Genres[]>(
        environment.movieDBBaseUrl +
          'genre/movie/list?api_key=' +
          environment.movieDBAPIKey
      )
      .pipe(
        map((res: any) => {
          return res.genres;
        })
      );
  }

  fetchMovieCast(movieId: number) {
    return this.http
      .get(
        environment.movieDBBaseUrl +
          'movie/' +
          movieId +
          '/credits?api_key=' +
          environment.movieDBAPIKey
      )
      .pipe(
        map((res: any) => {
          return res.cast;
        })
      );
  }
}
