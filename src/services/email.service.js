const sgMail = require("@sendgrid/mail");
const config = require("../config/config");

sgMail.setApiKey(config.email.sendGridApiKey);
/**
 *
 * @param {*} to
 * @param {*} from
 * @param {*} subject
 * @param {*} text
 * @param {*} html
 */
const sendMail = (msg) => {
  console.log(msg);
  sgMail
    .send(msg)
    .then((response) => {
      console.log(response[0].statusCode);
      console.log(response[0].headers);
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = {
  sendMail,
};
