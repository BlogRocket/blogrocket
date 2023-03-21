import { Schema, model, Model } from 'mongoose';

interface IPostDefinition {
  _id: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  title: string;
  body: string;
}

export type IPostModel = Model<IPostDefinition>;
export type IUser = IPostDefinition;

const PostSchema = new Schema<IPostDefinition, IPostModel>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    body: { type: String, required: true }
  },
  { timestamps: true }
);

const Post = model<IPostDefinition, IPostModel>('Post', PostSchema);
export default Post;
