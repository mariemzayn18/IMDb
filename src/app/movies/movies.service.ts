import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from './models/movie.model';
import { Genre } from './models/genre.model';
import { Actor } from './models/actor.model';

@Injectable({ providedIn: 'root' })
export class MoviesService {
  private topMovies: Movie[] = [];
  private movieGenres: Genre[] = [];

  public currentMovieActors: Actor[] = [];
  public currentMovieId: number=0;

  constructor(private http: HttpClient) {}

  //------------ Movies
  setTopMovies(movies: Movie[]) {
    this.topMovies = movies;
  }

  get movies() {
    return this.topMovies.slice();
  }

  getMovieDetails(movieId: number) {
    const movie = this.topMovies.find((movie) => movie.id === movieId);
    if (movie) {
      return movie;
    }
    return {} as Movie;
  }

  //------------ Genres
  setMovieGenres(genre: Genre[]) {
    this.movieGenres = genre;
  }

  get genres() {
    return this.movieGenres.slice();
  }

  mapGenresIds() {
    this.topMovies.map((movie) => {
      movie.genre = movie.genre.map((genreId) => {
        const foundGenre = this.genres.find((genre) => genre.id === genreId);
        return foundGenre ? foundGenre.name : '';
      });
    });
  }

  //------------ Actors

  setCurrentMovieId(id: number) {
    this.currentMovieId = id;
  }

  setMovieActors(actors: Actor[]) {
    this.currentMovieActors = actors;
  }

  get actors() {
    return this.currentMovieActors.slice();
  }
}
