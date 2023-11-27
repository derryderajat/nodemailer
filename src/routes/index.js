const express = require("express");
const router = express.Router();
const v1 = express.Router();

const userController = require("../controllers/users.controllers");
const authController = require("../controllers/auth.controller");
const activationController = require("../controllers/activation.controller");
const router_admin = require("../controllers/admin.controller");
v1.use("/", [
  userController,
  authController,
  activationController,
  router_admin,
]);
router.use("/v1", v1);
module.exports = router;
