export interface CreateAccountParams {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
}

export interface LoginParams {
  userName: string;
  password: string;
}

export interface LoginResult {
  ok: boolean;
  token?: String;
  error?: String;
}
