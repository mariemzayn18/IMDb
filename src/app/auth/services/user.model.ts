export class User {
  constructor(private _token: string, private _tokenExpirationDate: Date) {}

  get token() {
    if (!this._tokenExpirationDate || this._tokenExpirationDate < new Date()) {
      return null;
    }
    return this._token;
  }
}
