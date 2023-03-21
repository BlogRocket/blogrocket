export interface Token {
  _id: string;
  name: string;
  token: string;
  userId: string;
  expires: string;
  lastUsed?: string;
  lastIp?: string;
  createdAt: string;
}