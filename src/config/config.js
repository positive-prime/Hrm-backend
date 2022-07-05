const dotenv = require("dotenv");
const path = require("path");
const Joi = require("joi");
dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .required(),
    ROOT_PATH: Joi.string(),
    WRITE_PATH: Joi.string(),
    PORT: Joi.number().default(5000),
    DB_HOST: Joi.string()
      .required()
      .description("Postgres Host is required"),
    DB_USER: Joi.string()
      .required()
      .description("Postgres User is required"),
    DB_PORT: Joi.string()
      .required()
      .description("Postgres Port is required"),
    // POSTGRES_PASS: Joi.string()
    //   .allow()
    //   .optional()
    //   .description("Postgres Password"),
    DB_NAME: Joi.string()
      .required()
      .description("Postgres DB Name is required"),
    MYSQL_DB_URL: Joi.string().required().description("db url required"),
    JWT_SECRET: Joi.string().required().description("JWT secret key"),
    JWT_ACCESS_EXPIRATION_DAYS: Joi.number()
      .default(92)
      .description("minutes after which access tokens expire"),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
      .default(182)
      .description("days after which refresh tokens expire"),
    TWILIO_ACCOUNT_SID: Joi.string()
      .required()
      .description("Twilio account sid"),
    TWILIO_ACCOUNT_TOKEN: Joi.string()
      .required()
      .description("Twilio account auth token"),
    TWILIO_ACCOUNT_PHONE_NO: Joi.string()
      .required()
      .description("Twilio account phone number"),
    SENDGRID_API_KEY: Joi.string().required().description("Send Grid Api Key"),
    FROM_MAIL: Joi.string().required().description("Sendgrid email from"),
    STRIP_API_SECRET: Joi.string()
      .required()
      .description("Strip api secret key"),
    PAYPAL_CLIENT_ID: Joi.string()
      .required()
      .description("Paypal Client ID for paypal payment"),
    PAYPAL_CLIENT_SECRET: Joi.string()
      .required()
      .description("Paypal Client Secret for paypal payment"),
    PAYPAL_RETURN_URL: Joi.string()
      .required()
      .description("Paypal Payment Return Url"),
    PAYPAL_CANCEL_URL: Joi.string()
      .required()
      .description("Paypal Payment Cancel Url"),
    MEMBERSHIP_ID_LENGTH: Joi.number()
      .required()
      .description("Length For Membership Id"),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  rootPath: envVars.ROOT_PATH,
  thumbPath: envVars.THUMB_PATH,
  writePath: envVars.WRITE_PATH,
  writePathReplication: envVars.WRITE_PATH_PATH_REPLICATION,
  port: envVars.PORT,
  download: envVars.IMAGE_DOWNLOAD_CRON,
  otherMachine: envVars.IMS_OTHER_MACHINE,
  subtratcTimeForUnlock: envVars.TIME_SUBTARCT_FOR_UNLOCK,
  mysqlDbUrl: envVars.MYSQL_DB_URL,
  mysql: {
    host: envVars.DB_HOST,
    user: envVars.DB_USER,
    password: "",
    db: envVars.DB_NAME,
    // port: envVars.POSTGRES_PORT,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationDays: envVars.JWT_ACCESS_EXPIRATION_DAYS,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: 10,
  },
  user: {
    membershipIdLength: envVars.MEMBERSHIP_ID_LENGTH,
  },
  email: {
    sendGridApiKey: envVars.SENDGRID_API_KEY,
    fromEmail: envVars.FROM_MAIL,
  },
  sms: {
    twilioAccountSid: envVars.TWILIO_ACCOUNT_SID,
    twilioAccountAuthToken: envVars.TWILIO_ACCOUNT_TOKEN,
    twilioAccountPhoneNumber: envVars.TWILIO_ACCOUNT_PHONE_NO,
  },
  strip: {
    secretKey: envVars.STRIP_API_SECRET,
  },
  paypal: {
    paypalClientId: envVars.PAYPAL_CLIENT_ID,
    paypalClientSeecret: envVars.PAYPAL_CLIENT_SECRET,
    returnUrl: envVars.PAYPAL_RETURN_URL,
    cancelUrl: envVars.PAYPAL_CANCEL_URL,
  },
};
