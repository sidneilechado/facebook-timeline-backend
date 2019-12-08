import User from '../models/User';

module.exports = {
  async index(req, res) {
    const users = await User.find();
    return res.status(200).json(users);
  },

  async getOne(req, res) {
    const { email } = req.body;
    const user = await User.findOne({ email: email });

    return res.status(200).send(user._id);
  },

  async getOneId(req, res) {
    const { _id } = req.body;
    const user = await User.findOne({ _id: _id });

    return res.status(200).json(user);
  },

  async store(req, res) {
    const { name, email, password, tag } = req.body;

    const user = await User.create({
      name,
      email,
      password,
      tag,
    });

    return res.status(200).json(user);
  },
};
