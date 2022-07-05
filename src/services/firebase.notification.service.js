const admin = require("firebase-admin");
const serviceAccount = require("../../firebase_config.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const sendCreateNewEventNotification = (tokenArray, eventId) => {
  console.log(tokenArray);
  console.log(eventId);
  tokenArray.map((e) => {
    message = {
      notification: {
        title: "Society Sone",
        body: "A new event has been created",
      },
      data: {
        eventId: eventId,
      },
      token: e,
    };

    const sendNotificaiton = (message) => {
      admin
        .messaging()
        .send(message)
        .then((response) => {
          console.log("Sent Successfully", response);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };

    sendNotificaiton(message);
  });
};
const sendPushNotification = (tokenArray, currentJobID) => {
  console.log(tokenArray);
  tokenArray.map((e) => {
    const message = {
      notification: {
        title: "Society Sone",
        body: "A new event has been created",
      },
      data: {
        jobID: currentJobID,
      },
      token: e,
    };

    const sendNotificaiton = (message) => {
      admin
        .messaging()
        .send(message)
        .then((response) => {
          console.log("Sent Successfully", response);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };

    sendNotificaiton(message);
  });
};

module.exports = {
  sendPushNotification,
  sendCreateNewEventNotification,
};
