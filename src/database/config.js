const config = require("../config/config");
module.exports = {
  development: {
    use_env_variable: true,
    url: config.postgresDbUrl,
    dialect: "postgres",
  },
  test: {
    use_env_variable: true,
    url: config.postgresDbUrl,
    dialect: "postgres",
  },
  production: {
    use_env_variable: true,
    url: config.postgresDbUrl,
    dialect: "postgres",
  },
};
