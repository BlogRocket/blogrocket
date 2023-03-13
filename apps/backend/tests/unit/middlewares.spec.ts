import { assert } from 'chai';
import User from '../../models/User';

describe('Middleware', () => {
  describe('# requireAuth', () => {
    before(async () => {
      await User.deleteMany({});
    });

    it('should pass', async () => {
      assert(true)
    });
  });
});