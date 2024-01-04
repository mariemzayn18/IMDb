import { environment } from '../../../../environments/environment.development';

export class Actor {
  constructor(
    private id: number, //movie id
    public character: string,
    public name: string,
    private profile_path: string
  ) {}

  get actorImage() {
    return environment.movieBaseImageUrl + this.profile_path;
  }

  get movieId() {
    return this.id;
  }
}
