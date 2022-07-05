const crypto = require("crypto");
/**
 *
 * @returns Number
 */
const generateRandomMembershipId = async (length) => {
  return Math.floor(
    Math.pow(10, length - 1) +
      Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1)
  );
};

const generateRandomPassword = async () => {
  length = 10;
  wishlist =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$";

  return Array.from(crypto.randomFillSync(new Uint32Array(length)))
    .map((x) => wishlist[x % wishlist.length])
    .join("");
};

const generateRandomUserName = async (email) => {
  return email.split("@")[0];
};
const findOrCreate = async (model, payload) => {
  console.log(payload);
  model.findOrCreate({
    where: { email: payload.email },
    defaults: {
      ...payload,
    },
  });
};

const findUser = async (model, payload) =>
  model.findOne({
    where: {
      email: payload,
    },
    logging: false,
  });

const findByPk = async (model, id) => model.findByPk(id);

const findAll = async (model) => model.findAll();
module.exports = {
  generateRandomMembershipId,
  generateRandomPassword,
  generateRandomUserName,
  findByPk,
  findAll,
  findOrCreate,
  findUser,
};
