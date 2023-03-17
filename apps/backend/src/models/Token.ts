import { Schema, model, Model } from 'mongoose';
import uuid from 'uuid';

interface ITokenDefinition {
  _id: Schema.Types.ObjectId;
  token: string;
  userId: Schema.Types.ObjectId;
  expiresAt: Date;
}

export type ITokenModel = Model<ITokenDefinition>;
export type IUser = ITokenDefinition;

const TokenSchema = new Schema<ITokenDefinition, ITokenModel>(
  {
    token: { type: String, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    expiresAt: { type: Date, required: true }
  },
  { timestamps: true }
);

TokenSchema.pre('save', async function (next) {
  // create a token in format brp_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  this.token = 'brp_' + uuid.v4().replace(/-/g, '');
  next();
});

const Token = model<ITokenDefinition, ITokenModel>('Token', TokenSchema);
export default Token;
