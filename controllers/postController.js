const Post = require('../models/post');

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
    const post = new Post({
      title: req.body.title,
      text: req.body.text,
    });
    await post.save();
    res.status(201).json({ message: 'Post saved successfully!' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }};
///////////////////////////////////////////
exports.updatePost = async (req, res) => {
  try {
    const post = new Post({
      _id: req.params.id,
      title: req.body.title,
      text: req.body.text,
    });
    await Post.updateOne({_id: req.params.id}, post);
    res.status(201).json({ message: 'Post updated successfully!' });
  } catch (error) {
    res.status(400).json({ message: 'Post not found' });
  }};
///////////////////////////////////////////
exports.deletePost = async (req, res) => {
  try{
  await Post.deleteOne({_id: req.params.id});
  res.status(201).json({ message: 'Post deleted successfully!' });
  }
  catch (error) {
    res.status(400).json({ message: 'Post not found' });
  }};
///////////////////////////////////////////