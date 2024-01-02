import { Component } from '@angular/core';
import { MoviesService } from './movies.service';
import { Movie } from './movie.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies-catalog',
  templateUrl: './movies-catalog.component.html',
  styleUrl: './movies-catalog.component.css',
})
export class MoviesCatalogComponent {
  moviesList: Movie[] = [];

  constructor(private moviesService: MoviesService, private router: Router) {}

  ngOnInit() {
    this.fetchTopMovies();
  }

  fetchTopMovies() {
    this.moviesService.fetchTopMovies().subscribe({
      next: (res) => {
        this.moviesList = res.map(
          (movie: any) =>
            new Movie(
              movie.poster_path,
              movie.id,
              movie.title,
              movie.vote_average,
              movie.release_date,
              movie.overview,
              movie.genre_ids
            )
        );
      },
    });
  }

  showDetails(movie: Movie) {
    this.router.navigate(['/movie', movie.movieId, movie.title]);
  }
}
