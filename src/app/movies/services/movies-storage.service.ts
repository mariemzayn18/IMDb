import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, catchError, map, tap, of } from 'rxjs';
import { Movie } from '../models/movie.model';
import { Genre } from '../models/genre.model';
import { MoviesService } from './movies.service';
import { Actor } from '../models/actor.model';

@Injectable({
  providedIn: 'root',
})
export class MoviesStorageService {
  constructor(private http: HttpClient, private moviesService: MoviesService) {}

  // Fetch movies genres from the API
  fetchMovieGenres() {
    return this.http
      .get<Genre[]>(
        environment.movieDBBaseUrl +
          'genre/movie/list?api_key=' +
          environment.movieDBAPIKey
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
        catchError(this.handleError('fetchMovieGenres', []))
      );
  }

  // Fetch top movies from the API
  private mapToMovie(movie: any): Movie {
    return new Movie(
      movie.poster_path,
      movie.backdrop_path,
      movie.id,
      movie.title,
      movie.vote_average,
      new Date(movie.release_date),
      movie.overview,
      movie.genre_ids
    );
  }

  fetchTopMovies() {
    return this.http
      .get<Movie[]>(
        environment.movieDBBaseUrl +
          'movie/top_rated?api_key=' +
          environment.movieDBAPIKey
      )
      .pipe(
        map((res: any) => {
          if (res.results) {
            return res.results.map((movie: any) => this.mapToMovie(movie));
          }
          return res.results;
        }),
        tap((movies: Movie[]) => {
          this.moviesService.setTopMovies(movies);
          this.moviesService.mapGenresIds();
        }),
        catchError(this.handleError('fetchTopMovies', []))
      );
  }

  // Fetch movie details from the API
  private mapToMovieActors(actor: any): Actor {
    return new Actor(actor.id, actor.character, actor.name, actor.profile_path);
  }

  fetchMovieActors(movieId: number) {
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
          if (res.cast) {
            return res.cast.map((actor: any) => this.mapToMovieActors(actor));
          }
          return res.cast;
        }),
        tap((actor: any) => {
          this.moviesService.setMovieActors(actor);
        }),
        catchError(this.handleError('fetchMovieActors', []))
      );
  }

  // Error handling
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      operation = 'fetchTopMovies'
        ? 'Fetching the top movies'
        : 'fetchMovieGenres'
        ? 'Fetching the movie genres'
        : 'Fetching the movie actors';

      console.error(`${operation} failed: ${error.message}`);

      return of(result as T); // return an empty result.
    };
  }
}
