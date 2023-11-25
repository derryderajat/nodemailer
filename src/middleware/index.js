const handleErrors = require("../helper/errors.handler");
const {
  NotAuthenticatedError,
  NotAuthorizedError,
} = require("../utils/errors");
const { verifyToken } = require("../utils/jwt");

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
    console.log(verifiedToken);
    next();
  } catch (error) {
    handleErrors(res, error);
    return;
  }
};
// const isAuthorize = async (req, res, next) => {
//   // take from auth
//   const { email } = await req.user;

//   const isUsernameSame = username === req.params.username;
//   if (!isUsernameSame) {
//     handleErrors(res, new NotAuthorizedError("You are not allowed doing this"));
//     return;
//   }
//   next();
// };
module.exports = {
  isAuthenticate,
  // isAuthorize,
  // isUserAvail,
  // isCurrentPassCorrect,
};
