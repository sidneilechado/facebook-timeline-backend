const Post = require('../models/Post');

module.exports = {
  async index(req, res) {
    const posts = await Post.find().sort('createdAd-');

    return res.json(posts);
  },

  async store(req, res) {
    const { author, content } = req.body;

    const post = await Post.create({
      author,
      content,
    });

    req.io.emit('post', post);
    return res.status(200).json(post);
  },
};
