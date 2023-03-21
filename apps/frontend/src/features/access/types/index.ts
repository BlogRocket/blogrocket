export interface Token {
  _id: string;
  name: string;
  token: string;
  userId: string;
  expires: Date;
  lastUsed?: Date;
  lastIp?: string;
  createdAt: Date;
}