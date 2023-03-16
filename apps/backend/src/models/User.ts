import { Schema, model, Model } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUserDefinition {
  _id: string;
  email: string;
  username: string;
  password: string;
}

interface InstanceMethods {
  comparePassword: (password: string) => Promise<boolean>;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export type IUserModel = Model<IUserDefinition, {}, InstanceMethods>;
export type IUser = IUserDefinition & InstanceMethods;

const UserSchema = new Schema<IUserDefinition, IUserModel, InstanceMethods>(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false }
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

UserSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

const User = model<IUserDefinition, IUserModel>('User', UserSchema);
export default User;
