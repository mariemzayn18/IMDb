import { Component } from '@angular/core';
// import { MoviesService } from '../movies.service';
import { Movie } from '../models/movie.model';
import { Router } from '@angular/router';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-top-movies-catalog',
  templateUrl: './top-movies-catalog.component.html',
  styleUrl: './top-movies-catalog.component.css',
})
export class TopMoviesCatalogComponent {
  moviesList: Movie[] = [];

  constructor(private moviesService: MoviesService, private router: Router) {}

  ngOnInit() {
    this.moviesList = this.moviesService.movies;
  }

  showDetails(movie: Movie) {
    this.router.navigate(['/movies', movie.id, movie.title]);
  }
}
