const User = require('../models/User');

module.exports = {
  async store(req, res) {
    const { tag } = req.body;
    const { id } = req.params;

    const user = await User.findOneAndUpdate(
      { _id: id },
      { $push: { following: tag } },
      { returnNewDocument: true }
    );

    return res.status(200).json(user);
  },
};
