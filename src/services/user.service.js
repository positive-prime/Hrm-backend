const httpStatus = require("http-status");
const { findOrCreate } = require("../functions/auth");
const Models = require("../models");
const ApiError = require("../utils/ApiError");
const { users } = Models;
/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  const [newUser, created] = await users.findOrCreate({
    where: { email: userBody.email },
    defaults: {
      ...userBody,
    },
  });
  if (!created) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User email already exists!");
  }
  // const profileBody = {
  //   user: user.id,
  // };
  // await Profile.create(profileBody);
  return newUser;
};

// /**
//  * Query for users
//  * @param {Object} filter - Mongo filter
//  * @param {Object} options - Query options
//  * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
//  * @param {number} [options.limit] - Maximum number of results per page (default = 10)
//  * @param {number} [options.page] - Current page (default = 1)
//  * @returns {Promise<QueryResult>}
//  */
// const queryUsers = async (filter, options) => {
//   const users = await User.paginate(filter, options);
//   return users;
// };

// /**
//  * Get user by id
//  * @param {ObjectId} id
//  * @returns {Promise<User>}
//  */
// const getUserById = async (id) => {
//   return await User.findById(id);
// };

// /**
//  * Get user by email
//  * @param {string} email
//  * @returns {Promise<User>}
//  */
// const getUserByEmail = async (email) => {
//   return await User.findOne({ email });
// };

// /**
//  * Update user by id
//  * @param {ObjectId} userId
//  * @param {Object} updateBody
//  * @returns {Promise<User>}
//  */
// const updateUserById = async (userId, updateBody) => {
//   const user = await getUserById(userId);
//   if (!user) {
//     throw new ApiError(httpStatus.NOT_FOUND, "User not found");
//   }
//   // if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
//   //   throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
//   // }
//   Object.assign(user, updateBody);
//   // console.log(user);
//   await user.save();
//   return user;
// };

// /**
//  * Delete user by id
//  * @param {ObjectId} userId
//  * @returns {Promise<User>}
//  */
// const deleteUserById = async (userId) => {
//   const user = await getUserById(userId);
//   if (!user) {
//     throw new ApiError(
//       httpStatus.BAD_REQUEST,
//       "No account found for this user!"
//     );
//   }
//   await user.remove();
//   return (response = { msg: "user deleted" });
// };

module.exports = {
  createUser,
  // queryUsers,
  // getUserById,
  // getUserByEmail,
  // updateUserById,
  // deleteUserById,
};
