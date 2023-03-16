import { Schema, model, Model } from 'mongoose';

interface ITokenDefinition {
  _id: Schema.Types.ObjectId;
  token: string;
  userId: Schema.Types.ObjectId;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export type IUserModel = Model<ITokenDefinition, {}, {}>;
export type IUser = ITokenDefinition;

const UserSchema = new Schema<ITokenDefinition, IUserModel, {}>(
  {
    token: { type: String, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const User = model<ITokenDefinition, IUserModel>('User', UserSchema);
export default User;
