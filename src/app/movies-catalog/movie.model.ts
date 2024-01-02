import { environment } from '../../environments/environment.development';

export class Movie {
  constructor(
    private posterPath: string,
    private id: number,
    public title: string,
    public rating: number,
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
    return this.rating >= 8
      ? 'green'
      : this.rating >= 5
      ? 'orange'
      : 'red';
  }
}
