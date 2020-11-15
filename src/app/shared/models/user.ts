export interface IUser {
  id: number;
  firstName: string;
	lastName: string;
	login: string;
  password: string;
}

export class UserItem implements IUser {
  constructor(
    public id: number,
    public firstName: string = '',
		public lastName: string = '',
    public login: string = '',
    public password: string = '',
  ) {}
}
