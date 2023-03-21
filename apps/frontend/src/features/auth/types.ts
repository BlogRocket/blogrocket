export interface User {
  _id: string;
  email: string;
  username: string;
  createdAt: string;
}


export type UserResponse = {
  access: string;
  refresh: string;
  user: User;
}