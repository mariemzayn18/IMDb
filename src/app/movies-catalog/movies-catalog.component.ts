import { Component } from '@angular/core';
import { MoviesService } from './movies.service';
import { Movie } from './movie.model';
// import { Genres } from './genres.interface';

@Component({
  selector: 'app-movies-catalog',
  templateUrl: './movies-catalog.component.html',
  styleUrl: './movies-catalog.component.css',
})
export class MoviesCatalogComponent {
  moviesList: Movie[] = [];
  // genresList: Genres[] = [];

  constructor(private moviesService: MoviesService) {}

  ngOnInit() {
    this.fetchTopMovies();
    // this.fetchMovieGenres();
    this.moviesService.fetchMovieActors(278).subscribe({
      next: (res) => {
        console.log(res);
      },
    });
  }

  fetchTopMovies() {
    this.moviesService.fetchTopMovies().subscribe({
      next: (res) => {
        console.log(res);
        this.moviesList = res;
        console.log(this.moviesList);
      },
    });
  }

  // fetchMovieGenres() {
  //   this.moviesCatalogService.fetchMovieGenres().subscribe({
  //     next: (res) => {
  //       console.log(res);
  //     },
  //   });
  // }

  getRatingColor(rating: number) {
    return rating >= 8 ? 'green' : rating >= 5 ? 'orange' : 'red';
  }
}
