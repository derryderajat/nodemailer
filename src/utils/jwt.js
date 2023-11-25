const jwt = require("jsonwebtoken");
const { NotAuthenticatedError } = require("./errors");
const { JWT_SECRET_KEY } = process.env;
const createToken = async (payload) => {
  const token_1d_expired = 24 * 60 * 60;
  let token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: token_1d_expired,
    algorithm: "HS256",
  });
  return token;
};
const verifyToken = (token) => {
  let user;
  jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      let err_message = "Token is invalid or expired";

      throw new NotAuthenticatedError(err_message);
    }

    // Check if the token is not expired
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < currentTimestamp) {
      let err_message = "Token has expired";

      throw new NotAuthenticatedError(err_message);
    }
    user = decoded;
  });
  // console.log(user);
  return user;
};
module.exports = { createToken, verifyToken };
