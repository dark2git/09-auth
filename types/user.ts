export interface User {
  email: string;
  username: string;
  avatar: string;
}

export type RegisterRequest = {
  email: string;
  password: string;
};
