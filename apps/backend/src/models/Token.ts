import { Schema, model, Model } from 'mongoose';
import uuid from 'uuid';

interface ITokenDefinition {
  _id: Schema.Types.ObjectId;
  name: string;
  token: string;
  userId: Schema.Types.ObjectId;
  expires: Date;
  lastUsed?: Date;
  lastIp?: string;
  createdAt: Date;
}

export type ITokenModel = Model<ITokenDefinition>;
export type IUser = ITokenDefinition;

const TokenSchema = new Schema<ITokenDefinition, ITokenModel>(
  {
    name: { type: String, required: true, unique: true },
    token: { type: String, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    expires: { type: Date, required: true },
    lastUsed: { type: Date },
    lastIp: { type: String }
  },
  { timestamps: true }
);

const Token = model<ITokenDefinition, ITokenModel>('Token', TokenSchema);
export default Token;
