import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../models/movie.model';
import { MoviesService } from '../../services/movies.service';
import { MoviesStorageService } from '../../services/movies-storage.service';
import { exhaustMap } from 'rxjs';

@Component({
  selector: 'app-top-movies-catalog',
  templateUrl: './top-movies-catalog.component.html',
  styleUrl: './top-movies-catalog.component.css',
})
export class TopMoviesCatalogComponent {
  isLoading = false;
  moviesList: Movie[] = [];
  p = 1; // Current page

  constructor(
    private moviesService: MoviesService,
    private moviesStorageService: MoviesStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchingMovieDetails();
    this.pageChanged(this.p);
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
      });
  }

  setMovies() {
    this.moviesList = this.moviesService.movies;
  }

  showDetails(movie: Movie) {
    this.router.navigate(['/movies', movie.id, movie.title]);
  }

  pageChanged(page: number) {
    this.p = page;

    if (page === 1) {
      this.setMovies();
    } else if (!this.isLoading) {
      this.isLoading = true;
      this.moviesStorageService.fetchTopMovies(page).subscribe(() => {
        this.setMovies();
        this.isLoading = false;
      });
    }
  }
}
