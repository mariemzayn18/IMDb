import { exhaustMap } from 'rxjs';
import { MoviesStorageService } from './services/movies-storage.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent implements OnInit {
  isLoading = false;

  constructor(
    private moviesStorageService: MoviesStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchingMovieDetails();
  }

  fetchingMovieDetails() {
    this.isLoading = true;
    this.moviesStorageService
      .fetchMovieGenres()
      .pipe(
        exhaustMap(() => {
          return this.moviesStorageService.fetchTopMovies();
        })
      )
      .subscribe(() => {
        this.isLoading = false;
        this.router.navigate(['/movies/top-movies-catalog']);
      });
  }
}
