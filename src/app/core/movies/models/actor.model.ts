import { environment } from '../../../../environments/environment.development';

export class Actor {
  constructor(
    private id: number, //movie id
    public character: string,
    public name: string,
    public profile_path: string
  ) {}

  get movieId() {
    return this.id;
  }
}
