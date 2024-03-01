const User = require('../models/user');

exports.createUser = async (req, res) => {
  try {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
    });
    await user.save();
    res.status(201).json({ message: 'User saved successfully!' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }};
///////////////////////////////////////////
