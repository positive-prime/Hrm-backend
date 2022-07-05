"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../database/config.js")[env];
const envVars = require("../config/config");
const logger = require("../config/logger");
const db = {};

let sequelize;
try {
  if (config.use_env_variable) {
    sequelize = new Sequelize(envVars.postgresDbUrl, config);

    sequelize.authenticate()
    logger.info("Connected to Database.");
  } else {
    sequelize = new Sequelize(
      envVars.postgres.db,
      envVars.postgres.user,
      envVars.postgres.password,
      config
    );
    // sequelize.authenticate();
    // logger.info("Connected to Database.");
  }
} catch (error) {
  logger.info("error", error)
}
// const sequelize = new Sequelize('hrm', 'root', '', {
//   host: 'localhost',
//   dialect: 'mysql'
// })
// try {
//   sequelize.authenticate();
//   console.log("db connected")
// }
// catch (error) {
//   console.log(error)
// }

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });
// const Users = require("./users")(sequelize);
// db["Users"] = Users;
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
