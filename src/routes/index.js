const express = require("express");
const router = express.Router();
const v1 = express.Router();

const userController = require("../controllers/users.controllers");
const authController = require("../controllers/auth.controller");
const activationController = require("../controllers/activation.controller");
v1.use("/", [userController, authController, activationController]);
router.use("/v1", v1);
module.exports = router;
