const express = require("express");

const router = express.Router();

const userControllers = require("./controllers/userControllers");

/**
 * Create all routes for /users
 */

router.get("/users/", userControllers.browse);
router.post("/users/", userControllers.add);
router.get("/users/:id", userControllers.read);
router.put("/users/:id", userControllers.edit);
router.delete("/users/:id", userControllers.destroy);

module.exports = router;
