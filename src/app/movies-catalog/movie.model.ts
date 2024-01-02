import { environment } from '../../environments/environment.development';

export class Movie {
  constructor(
    private poster_path: string,
    private original_title: string,
    private vote_average: string, //rating
    private id: number,
    public release_date: string,
    public overview: string,
    public genre_ids: string[]
  ) {}

  get moviePoster() {
    return environment.movieBaseImageUrl + this.poster_path;
  }

  get movieRating() {
    return this.vote_average;
  }

  get movieTitle() {
    return this.original_title;
  }

  get movieId() {
    return this.id;
  }
}
