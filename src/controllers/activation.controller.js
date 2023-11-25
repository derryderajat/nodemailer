const handleErrors = require("../helper/errors.handler");
const { activateUserAccount } = require("../services/user.services");
const router = require("express").Router();

router.get("/activation/:email", async (req, res) => {
  const email = req.params.email.toLowerCase();

  try {
    const updatedUser = await activateUserAccount(email);
    res.status(200).json(updatedUser);
  } catch (error) {
    handleErrors(res, error);
  }
  return;
});

module.exports = router;
