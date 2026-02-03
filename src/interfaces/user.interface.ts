export interface IUser {
  id: number;
  username: string;
  password: string;
  merchantId: number;
}

export interface ILoginUser {
  username: string;
  password: string;
}