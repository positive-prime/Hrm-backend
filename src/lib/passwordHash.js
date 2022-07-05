const bcrypt = require("bcryptjs");
const SALT_HASH_KEY = 11;
const hashPassword = async (password) => bcrypt.hash(password, SALT_HASH_KEY);
const comparePassord = (password, dbPassword) =>
  bcrypt.compare(password, dbPassword);

module.exports = {
  hashPassword,
  comparePassord,
};
