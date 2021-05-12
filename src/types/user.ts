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

export interface EditProfileParams {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
}

export interface EditProfileResult {
  ok: boolean;
  error?: string;
}
