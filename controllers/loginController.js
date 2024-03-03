const User = require('../models/user');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();

///////////////////////////////////////////
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    res.status(401).json({ message: "Email not exist" });
  }
  if (user.password != password) {
    res.status(401).json({ message: "Password incorrect" });
  }
  const token = generateToken(user.email, user._id, user.role);
  res.status(200).json(token);
};
///////////////////////////////////////////
const generateToken = (email, _id, role) => {
  const token = jwt.sign({ email, _id, role }, process.env.secretcode , { expiresIn: "2h" });
  return token;
};