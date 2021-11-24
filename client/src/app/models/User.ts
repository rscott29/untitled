export class User {

  constructor(
    private user: string,
    public isLoggedIn: boolean,
    public message: string,
   public expireDate: number
  ) {}


}
