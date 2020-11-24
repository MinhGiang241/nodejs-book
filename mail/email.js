const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "minhgiang241@gmail.com",
    pass: "concoc221992",
  },
});
const sendWelcomeEmail = (email, name) => {
  let mailOptions = {
    from: "minhgiang241@gmail.com",
    to: email,
    subject: "Testing and Testing",
    text: `wellome to my app ${name}`,
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log("Error Occurs", err);
    } else {
      console.log("Email sent!!!");
    }
  });
};

const sendCancelationEmail = (email, name) => {
  let mailOptions = {
    from: "minhgiang241@gmail.com",
    to: email,
    subject: "Thank you",
    text: `Thank you, ${name} for using my app`,
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log("Error Occurs", err);
    } else {
      console.log("Email sent!!!");
    }
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail,
};
