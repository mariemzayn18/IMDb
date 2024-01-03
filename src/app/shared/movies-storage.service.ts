import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map, tap } from 'rxjs';
import { Movie } from '../movies/models/movie.model';
import { Genre } from '../movies/models/genre.model';
import { MoviesService } from '../movies/movies.service';

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
}
