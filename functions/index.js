const functions = require("firebase-functions");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey("SendGrid API Key");

exports.Forwardmessage = functions.database
  .ref("/feedback/{orderId}")
  .onCreate(async (snapshot, context) => {
    const val = snapshot.val();
    const mailOptions = {
      from: "me@kriss.io",
      to: "krissanawat101@gmail.com",
      subject: "Hey new message from " + val.name + ":" + val.email,
      html: "<b>" + val.message + "</b>",
    };

    sgMail
      .send(mailOptions)
      .then((res) => {
        return res;
      })
      .catch((res) => {
        return console.log(res);
      });
  });
