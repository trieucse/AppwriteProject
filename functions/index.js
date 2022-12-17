module.exports = async (req, res) => {
  const accountSid = req.variables.TWILIO_ACCOUNT_SID;
  const authToken = req.variables.TWILIO_AUTH_TOKEN;
  const senderPhone = req.variables.TWILIO_NUMBER;

  const client = require("twilio")(accountSid, authToken);

  const payload = JSON.parse(req.payload);
  const reciever = payload["reciever"];
  const message = payload["message"];

  if (!reciever) console.error("Where to send the message?");
  if (!message) console.error("What is the message?");

  client.messages
    .create({
      from: senderPhone,
      to: reciever,
      body: message,
    })
    .then(() => {
      console.log("Sent");
    })
    .catch((err) => {
      console.log(err);
    });
};
