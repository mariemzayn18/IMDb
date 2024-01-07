import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Movie } from '../movies/models/movie.model';
import { Genre } from '../movies/models/genre.model';
import { MoviesService } from './movies.service';

@Injectable({
  providedIn: 'root',
})
export class MoviesStorageService {
  constructor(private http: HttpClient, private moviesService: MoviesService) {}

  // Fetch movies genres from the API
  fetchMovieGenres() {
    return this.http
      .get<Genre[]>(
        environment.fetchingMovieGenresUrl + environment.movieDBAPIKey
      )
      .pipe(
        map((res: any) => {
          if (res.genres) {
            return res.genres.map(
              (genre: any) => new Genre(genre.id, genre.name)
            );
          }
          return res.genre;
        }),
        tap((genre) => {
          this.moviesService.setMovieGenres(genre);
        }),
        catchError((error: any) => {
          this.handleError(error);
          return of([]);
        })
      );
  }

  // Fetch top movies from the API
  public mapToMovie(movie: any, genres: any): Movie {
    return new Movie(
      movie.poster_path,
      movie.backdrop_path,
      movie.id,
      movie.title,
      movie.vote_average,
      new Date(movie.release_date),
      movie.overview,
      genres,
      movie.page
    );
  }

  fetchTopMovies(page: number = 1) {
    return this.http
      .get<Movie[]>(
        environment.fetchingTopMoviesUrl +
          environment.movieDBAPIKey +
          '&page=' +
          page
      )
      .pipe(
        map((res: any) => {
          if (res.results) {
            return res.results.map((movie: any) =>
              this.mapToMovie(movie, movie.genre_ids)
            );
          }
          return res.results;
        }),
        tap((movies: Movie[]) => {
          this.moviesService.setTopMovies(movies);
          this.moviesService.mapGenresIds();
        }),
        catchError((error: any) => {
          this.handleError(error);
          return of([]);
        })
      );
  }

  // Fetch movie actors from the API
  fetchMovieActorsById(movieId: number) {
    return this.http
      .get(
        environment.fetchingMovieByIdBaseUrl +
          movieId +
          '/credits?api_key=' +
          environment.movieDBAPIKey
      )
      .pipe(
        catchError((error: any) => {
          this.handleError(error);
          return of([]);
        })
      );
  }

  fetchMovieDetailsById(movieId: number) {
    return this.http
      .get(
        environment.fetchingMovieByIdBaseUrl +
          movieId +
          '?api_key=' +
          environment.movieDBAPIKey
      )
      .pipe(
        catchError((error: any) => {
          this.handleError(error);
          return of([]);
        })
      );
  }

  // Error handling
  private handleError(e: HttpErrorResponse) {
    let errorMessage = 'An error occurred. Please try again.';
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
