export interface Ilogon {
  userId: string;
  password: string;
}

export interface IinicialState {
  name: string;
  user: string;
  token: string;
  auth: boolean;
  loading: boolean;
}

export interface Istate {
  logon: IinicialState;
}
