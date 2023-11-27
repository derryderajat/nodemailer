const router = require("express").Router();
const handleErrors = require("../helper/errors.handler");
const { notifPasswordChanged, forgotPassword } = require("../libs/mailer");
const { isAuthenticate, emailExists } = require("../middleware");
const { findOne } = require("../repositories/user.repository");
const {
  getAllUsers,
  changePassword,
  updateProfileUser,
  forgotPasswordService,
} = require("../services/user.services");
const { BadRequestError, NotAuthenticatedError } = require("../utils/errors");
const path = require("path");
const { verifyToken } = require("../utils/jwt");
const limiter = require("../libs/limiter/request_reset_password");
/**
 * USERS ROUTE
 */
router.get("/users", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
    return;
  } catch (error) {
    handleErrors(res, error);
  }
});

// Modify user
router.patch("/user/change-password", [isAuthenticate], async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const { email } = req.user;
  try {
    const updatePassword = await changePassword(
      email,
      oldPassword,
      newPassword
    );
    res.status(201).json(updatePassword);
    await notifPasswordChanged(email);
  } catch (error) {
    handleErrors(res, error);
    return;
  }
  return;
});
router.patch("/user/update-profile", [isAuthenticate], async (req, res) => {
  try {
    const payload = {};
    payload.email = req.user.email;
    payload.profile_picture = req.body.profile_picture;
    const updatedProfile = await updateProfileUser(payload);
    res.status(201).json(updatedProfile);
    return;
  } catch (error) {
    handleErrors(res, error);
  }
  return;
});
router.post(
  "/user/forgot-password",
  [emailExists, limiter],
  async (req, res) => {
    console.log("Request reached the rate limiter middleware");
    console.log("Rate limiter response:", req.rateLimit);
    const token = req.token;
    const { email } = req.body;
    const resetLink = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/user/reset-password?token=${token}&email=${encodeURIComponent(
      email
    )}`;

    try {
      res.status(200).send("Password reset link sent to your email.");
      await forgotPassword(email, resetLink);
      return;
    } catch (error) {
      handleErrors(res, error);
    }
  }
);

router.get("/user/reset-password", (req, res) => {
  const { email, token } = req.query;
  const verifiedToken = verifyToken(token);
  let isLinkValid = false;
  if (verifiedToken) {
    const is_user_verified = verifiedToken.is_verified;
    if (!is_user_verified) {
      isLinkValid = false;
      throw new BadRequestError("Account is not verified");
    }
    const email_token = verifiedToken.email;
    if (email !== email_token) {
      isLinkValid = false;
      throw new BadRequestError("Reset Link is not valid");
    }
    isLinkValid = true;
  }
  // Check if the token is valid
  try {
    if (!isLinkValid) {
      res.sendFile(path.join(process.cwd(), "error-reset-password.html"));
      // throw new NotAuthenticatedError("Invalid or expired token");
      return;
    }

    res.sendFile(path.join(process.cwd(), "reset-password.html"));
    return;
  } catch (error) {
    handleErrors(res, error);
  }
});
router.post("/user/reset-password", async (req, res) => {
  const { token, email, newPassword } = req.body;
  // console.log(token, email, newPassword);
  const Token = verifyToken(token);
  try {
    if (Token.email !== email) throw BadRequestError("Reset Link is Invalid");
    const resetPassword = await forgotPasswordService(email, newPassword);
    res.sendFile(path.join(process.cwd(), "success-reset-password.html"));
    if (resetPassword) {
      await notifPasswordChanged(email);
    }
    return;
  } catch (error) {
    handleErrors(res, error);
  }
});

module.exports = router;
