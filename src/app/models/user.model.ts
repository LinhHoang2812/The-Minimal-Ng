export class User {
  constructor(
    public email: string,
    public uid: string,
    private _token: string,
    private _expirationDate: number
  ) {}
  get token() {
    if (new Date().getTime() > this._expirationDate) {
      return null;
    }
    return this._token;
  }
}
