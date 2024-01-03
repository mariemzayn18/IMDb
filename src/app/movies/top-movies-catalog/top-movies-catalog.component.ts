import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../models/movie.model';
import { MoviesService } from '../movies.service';
import { MoviesStorageService } from '../../shared/movies-storage.service';

@Component({
  selector: 'app-top-movies-catalog',
  templateUrl: './top-movies-catalog.component.html',
  styleUrl: './top-movies-catalog.component.css',
})
export class TopMoviesCatalogComponent {
  moviesList: Movie[] = [];
  p = 1; // Current page

  constructor(
    private moviesService: MoviesService,
    private router: Router,
    private moviesStorageService: MoviesStorageService
  ) {}

  ngOnInit() {
    this.moviesList = this.moviesService.movies;   
  }

  showDetails(movie: Movie) {
    this.moviesService.setCurrentMovieId(movie.id);
    this.router.navigate(['/movies', movie.id, movie.title]);
  }
}
