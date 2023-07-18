const express = require("express");

const router = express.Router();

const userControllers = require("./controllers/userControllers");
const friendControllers = require("./controllers/friendControllers");

/**
 * Create all routes for /users
 */

router.get("/users/", userControllers.browse);
router.post("/users/", userControllers.add);
router.get("/users/:id", userControllers.read);
router.put("/users/:id", userControllers.edit);
router.delete("/users/:id", userControllers.destroy);

/**
 * Create all routes for /friends
 */
router.get("/friends/", friendControllers.browse);
router.post("/friends/", friendControllers.add);
router.get("/friends/:id", friendControllers.read);
router.put("/friends/:id", friendControllers.edit);
router.delete("/friends/:id", friendControllers.destroy);
router.get("/friends/users/:id", friendControllers.browseFriends);

module.exports = router;
