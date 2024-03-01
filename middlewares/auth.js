const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    res.status(401).json("you are not authorized");
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    res.json("token not exist");
  }
  jwt.verify(token, process.env.secretcode , (error, user) => {
    if (error) {
      res.status(401).json("you are not authorized");
    }
    console.log("user", user);
    req.user = user;
  });
  next();
};
module.exports = auth;