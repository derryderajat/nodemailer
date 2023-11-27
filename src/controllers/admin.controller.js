const router = require("express").Router();
const handleErrors = require("../helper/errors.handler");
const { sendPromo } = require("../libs/mailer");
const { isAuthenticate, emailExists, isAdmin } = require("../middleware");
const { findAll } = require("../repositories/user.repository");
const {} = require("../services/user.services");

router.get("/broadcast/promo", [isAuthenticate, isAdmin], async (req, res) => {
  const { message } = req.body;
  try {
    const data = await findAll();
    const users_only = data.filter((item) => {
      if (item.role !== "ADMIN") return item;
    });
    const emails = users_only.map((item) => {
      return item.email;
    });

    res.status(200).json({ message: "Promo is sent" });
    await sendPromo(emails, message);
  } catch (error) {
    handleErrors(res, error);
    return;
  }
  return;
});

module.exports = router;
