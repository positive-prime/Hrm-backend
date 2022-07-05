const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const {
  authService,
  userService,
  tokenService,
  emailService,
  smsService,
} = require("../services");
const { authFunctions } = require("../functions");
const config = require("../config/config");
const ApiError = require("../utils/ApiError");
const { hashPassword } = require("../lib/passwordHash");

/**
 * Registration Module
 */
const register = catchAsync(async (req, res) => {
  let createUserBody = req.body;
  if (req.file) createUserBody.photoPath = req.file.filename;
  createUserBody.password = await hashPassword(createUserBody.password);
  createUserBody.email = createUserBody.email.toLowerCase();
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

/**
 * Login Module
 */
const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.login(email, password);
  let tokens = await tokenService.generateAuthTokens(user);
  console.log(tokens);
  res.send({ user, tokens });
});

/**
 * Logout Module
 */
const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body);
  res.status(httpStatus.NO_CONTENT).send();
});

/**
 * Approve User Module
 */
// const approveUser = catchAsync(async (req, res) => {
//   const userId = req.params.id;
//   const user = await authService.approveUser(userId);
//   const emailMessage = {
//     to: user.email,
//     from: {
//       email: config.email.fromEmail,
//     },
//     subject: "Account Approval",
//     html: `
//     <p>Your Account has been approved successfully, Please use below credentials to login to app.</p>
//     <tbody>
//     <tr><td></tr><b>Email  </b>${user.email}</td></tr>
//     <tr><td></tr><b>Username  </b>${user.userName}</td></tr>
//     <tr><td></tr><b>Membership Id  </b>${user.user_id}</td></tr>
//     <tr><td></tr><b>Password  </b>${user.unHashedPassword}</td></tr>
//     </tbody>
//     `,
//   };
//   emailService.sendMail(emailMessage);
//   res.send(user);
// });

/**
 * Refresh Token Module
 */
// const refreshTokens = catchAsync(async (req, res) => {
//   const { refreshToken } = req.body;
//   const tokens = await authService.refreshAuth(refreshToken);
//   res.send({ ...tokens });
// });

/**
 * Forgot Password Module
 */
// const forgotPassword = catchAsync(async (req, res) => {
//   const { email, membershipId } = req.body;
//   const user = await User.findOne({ email: email, user_id: membershipId });
//   console.log(user);
//   if (!user) {
//     throw new ApiError(
//       httpStatus.BAD_REQUEST,
//       "Invalid email or membership id"
//     );
//   }
//   const OTP = Math.floor(1000 + Math.random() * 9000);
//   const emailMessage = {
//     to: user.email,
//     from: {
//       email: config.email.fromEmail,
//     },
//     subject: "Reset Password",
//     html: `
//     <p>Please below is your reset password OTP, Do not share this OTP!</p>
//     <br>
//     <p>Your reset password verification code ${OTP}</p>
//     `,
//   };
//   emailService.sendMail(emailMessage);
//   res.json(OTP);
// });

/**
 * Reset Password Module
 */
// const resetPassword = catchAsync(async (req, res) => {
//   await authService.resetPassword(req.query.token, req.body.password);
//   res.status(httpStatus.NO_CONTENT).send();
// });

/**
 * Reset Password Via Email Module
 */
// const resetPasswordviaEmail = catchAsync(async (req, res) => {
//   const result = await authService.resetPasswordviaEmail(
//     req.body.email,
//     req.body.newPassword
//   );
//   res.json(result);
// });

/**
 * Change Password Module
 */
// const changePassword = catchAsync(async (req, res) => {
//   const user = await authService.changePassword(req.body);
//   const emailMessage = {
//     to: user.email,
//     from: {
//       email: config.email.fromEmail,
//     },
//     subject: "Password Change",
//     html: `
//     <p>Your password changed successfully.</p>
//     `,
//   };
//   emailService.sendMail(emailMessage);
//   res.json(user);
// });

module.exports = {
  register,
  login,
  logout,
  // refreshTokens,
  // forgotPassword,
  // resetPassword,
  // resetPasswordviaEmail,
  // changePassword,
  // approveUser,
};
