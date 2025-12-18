const jwt = require("jsonwebtoken");
const users = [];

const register = (req, res) => {
  users.push(req.body);
  res.json({ message: "Register success" });
};

const login = (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, "SECRET_KEY");
  res.json({ token });
};

module.exports = {
  register,
  login
};
