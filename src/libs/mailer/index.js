const nodemailer = require("nodemailer");
const { InternalServerError } = require("../../utils/errors");
const {
  welcomeHTML,
  passwordChangedHTML,
  promoHTML,
} = require("./template.body.mail");
require("dotenv").config();
const { SERVICE_MAIL, SENDER_MAIL, SENDER_MAIL_PW } = process.env;

const transporter = nodemailer.createTransport({
  host: SERVICE_MAIL,
  port: 465,
  secure: true,
  auth: {
    user: SENDER_MAIL,
    pass: SENDER_MAIL_PW,
  },
});

const forgotPassword = async (to, url_reset_password) => {
  const mailOptions = {
    from: SENDER_MAIL,
    to: to,
    subject: "Request Reset Password",
    html: `
        <p>Hello!</p>
        <p>We received a request to change your password. To reset your password, please click on the link below:</p>
        <a href="${url_reset_password}" style="display: inline-block; margin-top: 10px; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
        <p>If you didn't make this request, you can ignore this email.</p>
        <p>Thank you!</p>
      `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return true;
  } catch (error) {
    console.error(error);
    throw new InternalServerError(message.error);
  }
};

const welcomeNewUser = async (email, activationLink) => {
  const mailOptions = {
    from: SENDER_MAIL,
    to: email,
    subject: "Welcome to cobainmailer - Activate Your Account",
    html: welcomeHTML(activationLink),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Welcome email sent: " + info.response);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const congratsUserActivation = async (email) => {
  const mailOptions = {
    from: SENDER_MAIL,
    to: email,
    subject: "Congratulations! Your cobainmailer Account is Activated",
    html: activationHTML(email),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Congrats email sent: " + info.response);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const notifPasswordChanged = async (email) => {
  const mailOptions = {
    from: SENDER_MAIL,
    to: email,
    subject: "Password Successfully Updated",
    html: passwordChangedHTML(email),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Congrats email sent: " + info.response);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const sendPromo = async (emails, message) => {
  const mailOptions = {
    from: SENDER_MAIL,
    to: emails.join(", "),
    subject: "Special Promotion!",
    text: message,
    html: promoHTML(message, SENDER_MAIL),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Promotional email sent:", info.response);
    return true;
  } catch (error) {
    console.error("Error sending promotional email:", error);
    return false;
  }
};

const promoBirthday = async (emails, message) => {
  const mailOptions = {
    from: SENDER_MAIL,
    to: emails.join(", "),
    subject: "Special Promotion!",
    text: message,
    html: promoHTML(message, SENDER_MAIL),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = {
  sendPromo,
  forgotPassword,
  welcomeNewUser,
  congratsUserActivation,
  notifPasswordChanged,
};
