
export class Movie {
  constructor(
    public id: number,
    public posterPath: string,
    public backdropPath: string,
    public title: string,
    public releaseDate: Date,
    public overview: string,
  ) {}
}
