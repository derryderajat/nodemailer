const handleErrors = require("../helper/errors.handler");
const { findOne } = require("../repositories/user.repository");
const {
  NotAuthenticatedError,
  NotAuthorizedError,
  BadRequestError,
} = require("../utils/errors");
const { verifyToken, createToken } = require("../utils/jwt");

const isAuthenticate = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new NotAuthenticatedError("No token");
    }

    // Using Bearer token, e.g., 'Bearer th1sIsatOKEN213'
    const token = authorization.slice(7);

    const verifiedToken = verifyToken(token);
    req.user = verifiedToken;
    // console.log(verifiedToken);
    next();
  } catch (error) {
    handleErrors(res, error);
    return;
  }
};
const emailExists = async (req, res, next) => {
  try {
    const user = await findOne({ email: req.body.email });
    if (user) {
      let token = await createToken({
        id: user.id,
        email: user.email,
        is_verified: user.is_verified,
      });
      req.token = token;

      next();
    } else {
      throw new BadRequestError("Email is not registered");
    }
  } catch (error) {
    handleErrors(res, error);
  }
};

const isAdmin = async (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    throw new NotAuthorizedError("You are not allowed to do broadcast");
  }
  next();
};
module.exports = {
  isAuthenticate,
  emailExists,
  isAdmin,
  // isAuthorize,
  // isUserAvail,
  // isCurrentPassCorrect,
};
