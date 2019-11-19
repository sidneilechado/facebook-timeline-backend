import jwt from 'jsonwebtoken';

import authConfig from '../config/auth';
import User from '../models/User';

module.exports = {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!(user.password = password)) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { _id } = user;
    const token = jwt.sign({ _id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    return res.send(token);
  },
};
