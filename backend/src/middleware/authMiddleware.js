const { verifyToken } = require("../services/jwt");

const authMiddleware = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("No token");
    }

    const payload = verifyToken(token);
    req.user = payload;
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = authMiddleware;
