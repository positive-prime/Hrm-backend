const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const cors = require("cors");
const passport = require("passport");
const httpStatus = require("http-status");
const config = require("./config/config");
const morgan = require("./config/morgan");
const { jwtStrategy } = require("./config/passport");
const { authLimiter } = require("./middlewares/rateLimiter");
const logRequest = require("./middlewares/logRequest");
const routes = require("./routes");
const { errorConverter, errorHandler } = require("./middlewares/error");
const ApiError = require("./utils/ApiError");
const fs = require("fs");
const app = express();
const cron = require("node-cron");
const { eventFunctions } = require("./functions");
// const dir = "./public/uploads";
if (config.env !== "test") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}
// crone job to expire events - run after every 5 hours
// cron.schedule("0 0 */5 * * *'", async () => {
//   await eventFunctions.expireEvent();
//   // const options = { headers: { "Content-Type": "text/plain" } };
//   // if (typeof url !== "undefined") await axios.post(url, body, options);
// });
// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());
app.use(express.urlencoded({ limit: "500mb", extended: true }));

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());

// jwt authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

// limit repeated failed requests to auth endpoints
if (config.env === "production") {
  app.use("/auth", authLimiter);
}
app.use(express.static("public"));
app.use(logRequest);

// v1 api routes
app.use(routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "API Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
