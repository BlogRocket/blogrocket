import User from '../models/User';
import handleAsync from '../utils/handleAsync';

export default class UserController {
  static me = handleAsync(async (req, res) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      status: 'success',
      user: user
    });
  });
}
