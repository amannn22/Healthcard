const transporter = require("../config/mail");

module.exports = async (to, subject, text) => {
  await transporter.sendMail({
    from: "MediConnect",
    to,
    subject,
    text
  });
};
