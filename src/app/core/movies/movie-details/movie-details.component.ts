import { MoviesStorageService } from '../../services/movies-storage.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../models/movie.model';
import { Actor } from '../models/actor.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css',
})
export class MovieDetailsComponent implements OnInit {
  movieId: number = 0;
  movie: Movie = {} as Movie;
  actors: Actor[] = [];
  lang = 'en';
  movieYear: number = 0;

  isLoadingMovieDetails = false;
  isLoadingActors = false;

  constructor(
    private moviesService: MoviesService,
    private moviesStorageService: MoviesStorageService,
    private router: ActivatedRoute,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.translate();
    this.currentMovieId();
    this.getMovieDetails();
  }

  translate() {
    this.lang = localStorage.getItem('lang') || 'en';
    this.translateService.use(this.lang);
    document.dir = this.lang === 'ar' ? 'rtl' : 'ltr';
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
        .fetchMovieById(this.movieId)
        .subscribe((movie: any) => {
          if (movie?.original_title) {
            this.movie = this.moviesStorageService.mapToMovie(movie);
            this.extractYear(this.movie.releaseDate);
            this.isLoadingMovieDetails = false;
          }
        });
    } else {
      this.movie = this.moviesService.getMovieDetails(this.movieId);
      this.extractYear(this.movie.releaseDate);
    }
  }


  extractYear(date: Date) {
    this.movieYear = new Date(date).getFullYear();
  }
}
