import { MoviesStorageService } from '../../services/movies-storage.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../models/movie.model';
import { Actor } from '../models/actor.model';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css',
})
export class MovieDetailsComponent {
  movieId: number = 0;
  movie: Movie = {} as Movie;
  actors: Actor[] = [];

  movieYear: number = 0;

  isLoadingMovieDetails = false;
  isLoadingActors = false;

  constructor(
    private moviesService: MoviesService,
    private moviesStorageService: MoviesStorageService,
    private router: ActivatedRoute
  ) {}

  ngOnInit() {
    this.currentMovieId();
    this.getMovieDetails();
    this.fetchActors();
  }

  currentMovieId() {
    this.router.params.subscribe((params) => {
      this.movieId = +params['id'];
    });
  }

  getMovieDetails() {
    if (this.moviesService.movies.length === 0) {
      this.isLoadingMovieDetails = true;
      this.moviesStorageService
        .fetchMovieDetailsById(this.movieId)
        .subscribe((movie: any) => {
          if (movie?.original_title) {
            this.movie = this.moviesStorageService.mapToMovie(
              movie,
              movie.genres.map((genre: any) => genre.name)
            );
            this.extractYear(this.movie.releaseDate);
            this.isLoadingMovieDetails = false;
          }
        });
    } else {
      this.movie = this.moviesService.getMovieDetails(this.movieId);
      this.extractYear(this.movie.releaseDate);
    }
  }

  fetchActors() {
    this.isLoadingActors = true;
    this.moviesStorageService
      .fetchMovieActorsById(this.movieId)
      .subscribe((actors: any) => {
        //use safe navigation operator to avoid errors
        if (actors?.cast) {
          actors.cast =
            actors.cast.length > 6 ? actors.cast.slice(0, 6) : actors.cast;

          this.actors = actors.cast.map((actor: any) => {
            return new Actor(
              actor.id,
              actor.character,
              actor.name,
              actor.profile_path
            );
          });
        }
        this.isLoadingActors = false;
      });
  }

  extractYear(date: Date) {
    this.movieYear = new Date(date).getFullYear();
  }
}
