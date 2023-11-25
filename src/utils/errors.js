class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

class NotFoundError extends AppError {
  constructor(message = "Not Found") {
    super(message, 404);
  }
}

class BadRequestError extends AppError {
  constructor(message = "Bad Request") {
    super(message, 400);
  }
}
class DuplicateError extends AppError {
  constructor(message = "Duplicate Data") {
    super(message, 409);
  }
}

class NotAuthenticatedError extends AppError {
  constructor(message = "Not Authenticated") {
    super(message, 401);
  }
}

class NotAuthorizedError extends AppError {
  constructor(message = "Not Authorized") {
    super(message, 403);
  }
}

class InternalServerError extends AppError {
  constructor(message = "Internal Server Error") {
    super(message, 500);
  }
}

class TooManyRequestsError extends AppError {
  constructor(message = "Too Many Requests") {
    super(message, 429);
  }
}

module.exports = {
  AppError,
  NotFoundError,
  BadRequestError,
  NotAuthenticatedError,
  NotAuthorizedError,
  InternalServerError,
  TooManyRequestsError,
  DuplicateError,
};
