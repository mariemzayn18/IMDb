import { Component } from '@angular/core';
import { MoviesService } from './movies.service';
import { Movie } from './movie.model';

@Component({
  selector: 'app-movies-catalog',
  templateUrl: './movies-catalog.component.html',
  styleUrl: './movies-catalog.component.css',
})
export class MoviesCatalogComponent {
  moviesList: Movie[] = [];

  constructor(private moviesService: MoviesService) {}

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
}
