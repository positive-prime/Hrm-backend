const { Client } = require("pg");
const app = require("./app");
const config = require("./config/config");
const logger = require("./config/logger");
let server;
const client = new Client({
  user: config.mysql.user,
  host: config.mysql.host,
  database: config.mysql.db,
  password: config.mysql.password,
  port: 5432,
  // ssl  : {
  //   ca : fs.readFileSync('<path to CA cert file>')
  // }
});
// client.connect(function (err) {
//   if (err) throw err;
//   logger.info("Connected to Postgres Database");
// });
server = app.listen(config.port, () => {
  logger.info(`Listening to port ${config.port}`);
});
// mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
//   logger.info("Connected to MongoDB");
//   server = app.listen(config.port, () => {
//     logger.info(`Listening to port ${config.port}`);
//   });
//   //   const io = require('socket.io')(server, {
//   //     cors: {
//   //       origin: '*',
//   //       methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
//   //     },
//   //   });
//   //   app.set('io', io);
// });
const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
