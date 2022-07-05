const Joi = require("joi").extend(require("@joi/date"));
const { password } = require("./custom.validation");

const register = {
  body: Joi.object().keys({
    firstName: Joi.string().required().description("First name is required"),
    lastName: Joi.string().required().description("Last name is required"),
    email: Joi.string().email().required().description("Email is required"),
    password: Joi.string().required(),
    DateofBirth: Joi.date().format(["YYYY/MM/DD", "DD/MM/YYYY"]).required(),
    address: Joi.string()
      .max(250)
      .required()
      .description("Address line can't be greater then 250 characters"),
    city: Joi.string().required().description("City is required"),
    state: Joi.string().required().description("State is required"),
    postalCode: Joi.string().required().description("Postal code is required"),
    country: Joi.string().required().description("Country is required"),
    phone: Joi.string()
      .required()
      .required()
      .description("Phone number is required"),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    membershipId: Joi.number().required(),
  }),
};

const changePassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    user_id: Joi.number().required(),
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required(),
  }),
};
const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
};

const resetPasswordviaEmail = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    newPassword: Joi.string().required().custom(password),
  }),
};

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  resetPasswordviaEmail,
  changePassword,
};
