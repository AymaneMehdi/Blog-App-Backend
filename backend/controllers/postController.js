const Post = require('../models/post');
const jwt = require('jsonwebtoken');
///////////////////////////////////////////
exports.getAll = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ message: 'Post not found' });
  }};
///////////////////////////////////////////
exports.getOne = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: 'Post not found' });
  }};
///////////////////////////////////////////
exports.createPost = async (req, res) => {
  try {  
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, "secretcode");
  const author = decodedToken._id;
    const post = new Post({
      image: req.body.image,
      title: req.body.title,
      text: req.body.text,
      author: author,
    });
    await post.save();
    res.status(201).json({ message: 'Post saved successfully!' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }};
///////////////////////////////////////////
exports.updatePost = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, "secretcode");
    const author = decodedToken._id;
    const post = await Post.findOne({ _id: req.params.id, author: author });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    post.image = req.body.image,
    post.title = req.body.title;
    post.text = req.body.text;
    await post.save();
    res.status(200).json({ message: 'Post updated successfully!' });
  } catch (error) {
    res.status(400).json({ message: 'Error updating post' });
  }};
///////////////////////////////////////////
exports.deletePost = async (req, res) => {
  try{
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, "secretcode");
  const author = decodedToken._id;
  await Post.deleteOne({_id: req.params.id, author: author});
  res.status(201).json({ message: 'Post deleted successfully!' });
  }
  catch (error) {
    res.status(400).json({ message: 'Post not found' });
  }};
///////////////////////////////////////////