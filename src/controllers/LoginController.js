import jwt from 'jsonwebtoken';

import authConfig from '../config/auth';
import User from '../models/User';

module.exports = {
  async store(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      if (!(await user.compareHash(password))) {
        return res.status(400).json({ error: 'Invalid password' });
      }

      return res.json({
        user,
        token: user.generateToken(),
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: 'User authentication failed' });
    }
  },
};
