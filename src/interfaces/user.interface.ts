export interface IUser {
  id: number;
  username: string;
  password: string;
  merchant_id: number;
}

export interface ILoginUser {
  username: string;
  password: string;
}