const {
  NotAuthenticatedError,
  NotFoundError,
  BadRequestError,
  DuplicateError,
  NotAuthorizedError,
  InternalServerError,
  TooManyRequestsError,
} = require("../utils/errors");
const Sentry = require("../libs/sentry");
const handleErrors = (res, error) => {
  if (error instanceof NotAuthenticatedError) {
    // Respons untuk kesalahan Not Authenticated
    res.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
    return;
  } else if (error instanceof NotFoundError) {
    // Respons untuk kesalahan Not Found
    res.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
    return;
  } else if (error instanceof BadRequestError) {
    // Respons untuk kesalahan Bad Request
    res.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
    return;
  } else if (error instanceof DuplicateError) {
    // Respons untuk kesalahan Duplicate Data
    res.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
    return;
  } else if (error instanceof NotAuthorizedError) {
    // Respons untuk kesalahan Not Authorized
    res.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
    return;
  } else if (error instanceof InternalServerError) {
    // Respons untuk kesalahan Internal Server Error
    Sentry.captureException(error);
    res.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
    return;
  } else if (error instanceof TooManyRequestsError) {
    // Respons untuk kesalahan Too Many Requests
    res.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
    return;
  }
};

module.exports = handleErrors;
