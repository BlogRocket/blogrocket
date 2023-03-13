import handleAsync from '../utils/handleAsync';

export default class UserController {
  static me = handleAsync(async (req, res) => {
    res.status(200).json({
      status: 'success',
      user: req.user
    });
  });
}
