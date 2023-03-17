import Post from "../models/Post";
import handleAsync from "../utils/handleAsync";

export default class PostController {
  /** create a post */
  static createPost = handleAsync(async (req, res) => {
    const userId = req.user._id.toString();
    const { title, body } = req.body;
    const post = await Post.create({ userId, title, body });
    res.status(200).json({
      status: 'success',
      post
    });
  });

  /** get all post */
  static getAllPosts = handleAsync(async (req, res) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const total = await Post.countDocuments({ userId: req.user._id });
    const posts = await Post.find({ userId: req.user._id }).skip(skip).limit(limit);
    res.status(200).json({
      status: 'success',
      posts,
      page,
      total
    });
  });

  /** get a post */
  static getPost = handleAsync(async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;
    const post = await Post.findById({ _id: id, userId });
    if (!post) {
      return res.status(404).json({
        status: 'error',
        message: 'Post not found'
      });
    }

    res.status(200).json({
      status: 'success',
      post
    });
  })
}