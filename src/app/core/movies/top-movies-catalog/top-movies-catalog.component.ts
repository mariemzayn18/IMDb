import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../models/movie.model';
import { MoviesService } from '../../services/movies.service';
import { MoviesStorageService } from '../../services/movies-storage.service';
import { concatMap, take } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-top-movies-catalog',
  templateUrl: './top-movies-catalog.component.html',
  styleUrl: './top-movies-catalog.component.css',
})
export class TopMoviesCatalogComponent implements OnInit {
  isLoading = false;
  moviesList: Movie[] = [];
  p = 1; // Current page

  constructor(
    private moviesService: MoviesService,
    private moviesStorageService: MoviesStorageService,
    private router: Router,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.translate();
    this.initMoviesFetching();
  }

  translate() {
    let lang = localStorage.getItem('lang') || 'en';
    this.translateService.use(lang);
    document.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }
  
  initMoviesFetching() {
    this.isLoading = true;
    this.moviesStorageService
      .fetchMovies()
      .subscribe(() => {
        this.setMovies();
        this.isLoading = false;
      });
  }

  setMovies() {
    this.moviesList = this.moviesService.movies;
  }

  showDetails(movie: Movie) {
    this.router.navigate(['/movies', movie.id, movie.title]);
  }

  pageChanged(page: number) {
    this.p = page;
    this.isLoading = true;
    this.moviesStorageService.fetchMovies(page).subscribe(() => {
      this.setMovies();
      this.isLoading = false;
    });
  }
}
