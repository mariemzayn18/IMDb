import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { exhaustMap, of } from 'rxjs';
import { MoviesStorageService } from './movies-storage.service';
import { MoviesService } from './movies.service';

// To guarantee that data is available before the component is rendered.
export const MoviesResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const moviesStorageService = inject(MoviesStorageService);
  const moviesService = inject(MoviesService);
  const movies = moviesService.movies;
  if (movies.length === 0) {
    return moviesStorageService.fetchMovieGenres().pipe(
      exhaustMap(() => {
        return moviesStorageService.fetchTopMovies();
      })
    );
  } else {
    return of(movies);
  }
};
