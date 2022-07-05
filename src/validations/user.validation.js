const Joi = require("joi").extend(require("@joi/date"));
const { password, objectId } = require("./custom.validation");

const createUser = {
  body: Joi.object().keys({}),
};

const getUsers = {
  query: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      body: Joi.object().keys({
        firstName: Joi.string()
          .allow()
          .optional()
          .description("First name is required"),
        lastName: Joi.string()
          .allow()
          .optional()
          .description("Last name is required"),
        email: Joi.string()
          .email()
          .allow()
          .optional()
          .description("Email is required"),
        password: Joi.string().allow().optional(),
        DateofBirth: Joi.date()
          .format(["YYYY/MM/DD", "DD/MM/YYYY"])
          .allow()
          .optional(),
        address: Joi.string()
          .max(250)
          .allow()
          .optional()
          .description("Address line can't be greater then 250 characters"),
        city: Joi.string().allow().optional().description("City is required"),
        state: Joi.string().allow().optional().description("State is required"),
        postalCode: Joi.string()
          .allow()
          .optional()
          .description("Postal code is required"),
        country: Joi.string()
          .allow()
          .optional()
          .description("Country is required"),
        phone: Joi.string()
          .allow()
          .optional()
          .description("Phone number is required"),
      }),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const deviceToken = {
  body: Joi.object().keys({
    deviceToken: Joi.string().required(),
  }),
};
module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  deviceToken,
};
