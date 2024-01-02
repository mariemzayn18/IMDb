import { environment } from '../../environments/environment.development';

export class Movie {
  constructor(
    private posterPath: string,
    private id: number,
    public movieTitle: string,
    public movieRating: number,
    public releaseDate: string,
    public overview: string,
    public genreIds: string[],
    private _ratingColor?: string
  ) {}

  get moviePoster() {
    return environment.movieBaseImageUrl + this.posterPath;
  }

  get movieId() {
    return this.id;
  }

  get ratingColor() {
    return this.movieRating >= 8
      ? 'green'
      : this.movieRating >= 5
      ? 'orange'
      : 'red';
  }
}
