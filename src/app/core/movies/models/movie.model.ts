import { environment } from '../../../../environments/environment.development';

export class Movie {
  constructor(
    private posterPath: string,
    public backdropPath: string,
    public id: number,
    public title: string,
    public rating: number,
    public releaseDate: Date,
    public overview: string,
    public genre: string[]
  ) {}

  get moviePoster() {
    return environment.movieBaseImageUrl + this.posterPath;
  }

  get movieBackdrop() {
    return environment.movieBaseImageUrl + this.backdropPath;
  }
}
