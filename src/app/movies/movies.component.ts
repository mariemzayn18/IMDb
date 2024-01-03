import { exhaustMap, take } from 'rxjs';
import { MoviesStorageService } from './../shared/movies-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent implements OnInit {
  constructor(private moviesStorageService: MoviesStorageService) {}

  ngOnInit() {
    // this.moviesStorageService.fetchMovieGenres().subscribe();
    // this.moviesStorageService.fetchTopMovies().subscribe();
    this.moviesStorageService
      .fetchMovieGenres()
      .pipe(
        exhaustMap(() => {
          return this.moviesStorageService.fetchTopMovies();
        })
      )
      .subscribe();
  }
}
