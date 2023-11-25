const nodemailer = require("nodemailer");
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

const forgetPassword = async (to, newPassword) => {
  const mailOptions = {
    from: SENDER_MAIL,
    to: to,
    subject: "Your New Password",
    html: `
        <p>Hello!</p>
        <p>We received a request to change your password. Your new password is:</p>
        <strong>${newPassword}</strong>
        <p>Please log in with your new password and consider changing it to a more secure one.</p>
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
    return false;
  }
};

const welcomeNewUser = async (email, activationLink) => {
  const mailOptions = {
    from: SENDER_MAIL,
    to: email,
    subject: "Welcome to cobainmailer - Activate Your Account",
    html: `
        <p>Welcome to cobainmailer!</p>
        <p>Congratulations on joining our community. To activate your account, please click the following link:</p>
        <a href="${activationLink}">Activate Account</a>
        <p>If you didn't sign up for cobainmailer, you can ignore this email.</p>
        <p>Thank you and enjoy using cobainmailer!</p>
      `,
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
    html: `
        <p>Congratulations!</p>
        <p>Your cobainmailer account is now activated. You can start using our link shortening services:</p>
        <a href="https://cobainmailer.com">cobainmailer - Shorten Your Links</a>
        <p>If you have any questions or need assistance, feel free to contact us.</p>
        <p>Thank you for choosing cobainmailer!</p>
      `,
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
    subject: "Password Changed Successfully on cobainmailer",
    html: `
        <p>Congratulations!</p>
        <p>Your password on cobainmailer has been successfully changed.</p>
        <p>You can continue using our link shortening services:</p>
        <a href="https://cobainmailer.com">cobainmailer - Shorten Your Links</a>
        <p>If you have any questions or need assistance, feel free to contact us.</p>
        <p>Thank you for choosing cobainmailer!</p>
      `,
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

module.exports = {
  forgetPassword,
  welcomeNewUser,
  congratsUserActivation,
  notifPasswordChanged,
};
