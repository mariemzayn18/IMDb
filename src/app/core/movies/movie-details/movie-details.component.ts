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

  isLoading = false;

  constructor(
    private moviesService: MoviesService,
    private moviesStorageService: MoviesStorageService,
    private router: ActivatedRoute
  ) {}

  ngOnInit() {
    this.currentMovieId();
    this.getMovieDetails();
    this.fetchActors();
    this.extractYear(this.movie.releaseDate);
  }

  currentMovieId() {
    this.movieId = +this.router.snapshot.params['id'];
  }

  getMovieDetails() {
    this.movie = this.moviesService.getMovieDetails(this.movieId);
  }

  fetchActors() {
    this.isLoading = true;
    this.moviesStorageService
      .fetchMovieActors(this.movieId)
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
        this.isLoading = false;
      });
  }

  extractYear(date: Date) {
    this.movieYear = new Date(date).getFullYear();
  }
}
