export interface IUser {
  id: number;
  username: string;
  password: string;
  role: number;
}

export interface ILoginUser {
  username: string;
  password: string;
}