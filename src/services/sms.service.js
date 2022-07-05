const config = require("../config/config");
const client = require("twilio")(
  config.sms.twilioAccountSid,
  config.sms.twilioAccountAuthToken
);
const sendSms = (data) => {
  client.messages
    .create({
      body: data.body,
      from: config.sms.twilioAccountPhoneNumber,
      to: data.to,
    })
    .then((message) => console.log(message.sid));
};

module.exports = {
  sendSms,
};
