const jwt = require("jsonwebtoken");

const createToken = (user) => {
  const payload = {
    id: user.id,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  createToken,
  verifyToken,
};
