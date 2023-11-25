const Sentry = require("@sentry/node");
const initializeSentry = (dsn) => {
  Sentry.init({
    dsn,
    tracesSampleRate: 1.0,
  });
};

initializeSentry(process.env.SENTRY_DSN);

module.exports = Sentry;
