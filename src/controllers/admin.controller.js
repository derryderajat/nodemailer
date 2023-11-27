const router = require("express").Router();
const handleErrors = require("../helper/errors.handler");
const { notifPasswordChanged, forgotPassword } = require("../libs/mailer");
const { isAuthenticate, emailExists, isAdmin } = require("../middleware");
const { findOne, findAll } = require("../repositories/user.repository");
const {} = require("../services/user.services");
const { BadRequestError, NotAuthenticatedError } = require("../utils/errors");
const { verifyToken } = require("../utils/jwt");

router.get("/broadcast/promo", [isAuthenticate, isAdmin], async (req, res) => {
  const { message } = req.body;
  try {
    const users = await findAll();
    const emails = users.map((item) => {
      return item.email;
    });
    res.status(201).json(emails);
    // await notifPasswordChanged(email);
  } catch (error) {
    handleErrors(res, error);
    return;
  }
  return;
});

module.exports = router;
