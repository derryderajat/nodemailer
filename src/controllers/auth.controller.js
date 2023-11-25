const router = require("express").Router();
const { register, signinUser } = require("../services/user.services");
const handleErrors = require("../helper/errors.handler");
const { welcomeNewUser } = require("../libs/mailer");
const { BadRequestError } = require("../utils/errors");

router.post("/auth/register", async (req, res) => {
  const userData = req.body;

  try {
    const newUser = await register(userData);
    res.status(200).json(newUser);
    const activationLink = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/activation/${userData.email}`;
    // send notification
    if (newUser) {
      if (!newUser.is_verified) {
        await welcomeNewUser(newUser.email, activationLink);
      }
    }
    return;
  } catch (error) {
    handleErrors(res, error);
  }
  return;
});

router.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const logging = await signinUser(email, password);
    res.status(200).json(logging);
    return;
  } catch (error) {
    handleErrors(res, error);
  }
});

router.get("/auth/forgot-password", async () => {});

module.exports = router;
