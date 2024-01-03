import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map, tap } from 'rxjs';
import { Movie } from '../movies/models/movie.model';
import { Genre } from '../movies/models/genre.model';
import { MoviesService } from '../movies/movies.service';
import { Actor } from '../movies/models/actor.model';

@Injectable({
  providedIn: 'root',
})
export class MoviesStorageService {
  constructor(private http: HttpClient, private moviesService: MoviesService) {}

  fetchMovieGenres() {
    return this.http
      .get<Genre[]>(
        environment.movieDBBaseUrl +
          'genre/movie/list?api_key=' +
          environment.movieDBAPIKey
      )
      .pipe(
        map((res: any) => {
          if (res.genres) {
            return res.genres.map(
              (genre: any) => new Genre(genre.id, genre.name)
            );
          }
          return res.genre;
        }),
        tap((genre) => {
          this.moviesService.setMovieGenres(genre);
        })
      );
  }

  fetchTopMovies() {
    return this.http
      .get<Movie[]>(
        environment.movieDBBaseUrl +
          'movie/top_rated?api_key=' +
          environment.movieDBAPIKey
      )
      .pipe(
        map((res: any) => {
          if (res.results) {
            return res.results.map(
              (movie: any) =>
                new Movie(
                  movie.poster_path,
                  movie.backdrop_path,
                  movie.id,
                  movie.title,
                  movie.vote_average,
                  new Date(movie.release_date),
                  movie.overview,
                  movie.genre_ids
                )
            );
          }
          return res.results;
        }),
        tap((movies: Movie[]) => {
          this.moviesService.setTopMovies(movies);
          this.moviesService.mapGenresIds();
        })
      );
  }

  fetchMovieActors(movieId: number) {
    return this.http
      .get(
        environment.movieDBBaseUrl +
          'movie/' +
          movieId +
          '/credits?api_key=' +
          environment.movieDBAPIKey
      )
      .pipe(
        map((res: any) => {
          if (res.cast) {
            return res.cast.map(
              (actor: any) =>
                new Actor(
                  actor.id,
                  actor.character,
                  actor.name,
                  actor.profile_path
                )
            );
          }
          return res.cast;
        }),
        tap((actor: any) => {
          this.moviesService.setMovieActors(actor);
        })
      );
  }
}
