import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../models/movie.model';
import { MoviesService } from '../services/movies.service';
import { MoviesStorageService } from '../services/movies-storage.service';
import { exhaustMap } from 'rxjs';

@Component({
  selector: 'app-top-movies-catalog',
  templateUrl: './top-movies-catalog.component.html',
  styleUrl: './top-movies-catalog.component.css',
})
export class TopMoviesCatalogComponent {
  title = 'Top-Rated Movies';
  moviesList: Movie[] = [];
  p = 1; // Current page

  constructor(
    private moviesService: MoviesService,
    private moviesStorageService: MoviesStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.setMovies();
  }

  setMovies() {
    this.moviesList = this.moviesService.movies;
    this.moviesList.pop();
  }

  showDetails(movie: Movie) {
    this.router.navigate(['/movies', movie.id, movie.title]);
  }

  pageChanged(page: number) {
    this.p = page;
    this.moviesStorageService.fetchTopMovies(page).subscribe(() => {
      this.setMovies();
    });
  }
}
