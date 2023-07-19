const express = require("express");

const router = express.Router();

const userControllers = require("./controllers/userControllers");
const friendControllers = require("./controllers/friendControllers");
const authMiddleware = require("./middleware/authMiddleware");
const adminMiddleware = require("./middleware/adminMiddleware");

/**
 * auth
 */
router.post("/users/register", userControllers.add);
router.post("/users/login", userControllers.login);

/**
 * Create all routes for /users
 */
router.get("/users/", authMiddleware, adminMiddleware, userControllers.browse);
router.get("/users/:id", authMiddleware, userControllers.read);
router.put("/users/:id", authMiddleware, userControllers.edit);
router.delete("/users/:id", authMiddleware, userControllers.destroy);

/**
 * Create all routes for /friends
 */
router.get(
  "/friends/",
  authMiddleware,
  adminMiddleware,
  friendControllers.browse
);
router.post("/friends/", authMiddleware, friendControllers.add);
router.get("/friends/:id", authMiddleware, friendControllers.read);
router.put("/friends/:id", authMiddleware, friendControllers.edit);
router.delete("/friends/:id", authMiddleware, friendControllers.destroy);
router.get("/friends/users/", authMiddleware, friendControllers.browseFriends);

module.exports = router;
