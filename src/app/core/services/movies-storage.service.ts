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

  mapToMovie(movie: any) {
    return new Movie(
      movie.id,
      movie.posterPath,
      movie.backdropPath,
      movie.title,
      new Date(movie.releaseDate.split('T')[0]),
      movie.overview,
    );
  }
  fetchMovies(page: number = 1) {
    return this.http
      .get<Movie[]>(
        environment.moviesAPI +'?page=' + page
      )
      .pipe(
        map((res: any) => {
          if (res) {
            console.log(res);
            return res.map(
              (movie: any) => this.mapToMovie(movie)
            );
          }

          return res;
        }),
        tap((movies: Movie[]) => {
          this.moviesService.setTopMovies(movies);
        }),
        catchError((error: any) => {
          this.handleError(error);
          return of([]);
        })
      );
  }

  fetchMovieById(movieId: number) {
    return this.http.get(environment.movieDetailsAPI + movieId).pipe(
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
