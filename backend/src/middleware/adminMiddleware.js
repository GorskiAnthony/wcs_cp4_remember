const models = require("../models");

const adminMiddlware = async (req, res, next) => {
  try {
    const [isAdmin] = await models.user.isAdmin(req.user.id);
    if (isAdmin.length === 0) throw new Error("You are not admin");
    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = adminMiddlware;
