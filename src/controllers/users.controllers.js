const router = require("express").Router();
const handleErrors = require("../helper/errors.handler");
const { notifPasswordChanged } = require("../libs/mailer");
const { isAuthenticate } = require("../middleware");
const { findOne } = require("../repositories/user.repository");
const {
  getAllUsers,
  changePassword,
  updateProfileUser,
} = require("../services/user.services");
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
router.get("/users/:email", [isAuthenticate], async (req, res) => {
  try {
    const email = req.params.email;
    const user = await findOne({ email: email });

    res.status(200).json(user);
    return;
  } catch (error) {
    // console.log("ECTRL:", error);

    handleErrors(res, error);
  }
});

router.patch(
  "/users/:email/change-password",
  [isAuthenticate],
  async (req, res) => {
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
  }
);
router.patch(
  "/users/:email/update-profile",
  [isAuthenticate],
  async (req, res) => {
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
  }
);
module.exports = router;
