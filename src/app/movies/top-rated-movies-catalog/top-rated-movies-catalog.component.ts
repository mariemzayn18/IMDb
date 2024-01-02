import { Component } from '@angular/core';
import { MoviesService } from '../movies.service';
import { Movie } from '../models/movie.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-rated-movies-catalog',
  templateUrl: './top-rated-movies-catalog.component.html',
  styleUrl: './top-rated-movies-catalog.component.css',
})
export class TopRatedMoviesCatalogComponent {
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
    this.router.navigate(['/movies', movie.id, movie.title]);
  }
}
