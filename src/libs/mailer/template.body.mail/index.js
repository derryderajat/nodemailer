const welcomeHTML = (activationLink) => `
<p>Welcome to cobainmailer!</p>
<p>Congratulations on joining our community. To activate your account, please click the following link:</p>
<a href="${activationLink}">Activate Account</a>
<p>If you didn't sign up for cobainmailer, you can ignore this email.</p>
<p>Thank you and enjoy using cobainmailer!</p>
`;

const activationHTML = (email) => `
<p>Congratulations!</p>
<p>${email}</p>
<p>Your cobainmailer account is now activated. You can start using our link shortening services:</p>
<a href="https://cobainmailer.com">cobainmailer - Shorten Your Links</a>
<p>If you have any questions or need assistance, feel free to contact us.</p>
<p>Thank you for choosing cobainmailer!</p>
`;

const passwordChangedHTML = (email) =>
  `
        <p>Congratulations!</p>
        <p>${email}</p>
        <p>Your password on cobainmailer has been successfully updated.</p>
        <p>You can continue using our link shortening services:</p>
        <p>If you have any questions or need assistance, feel free to contact us.</p>
        <p>Thank you for choosing cobainmailer!</p>
      `;

const promoHTML = (message, SENDER_MAIL) => `
<p>Dear customer,</p>
<p>We are excited to announce a special promotion just for you!</p>
<p>${message}</p>
<p>Don't miss out on this fantastic opportunity. Visit our website or store to take advantage of the promotion now!</p>
<p>Thank you for choosing ${SENDER_MAIL}.</p>
<p>Best regards,<br>cobaimmailer</p>
`;
module.exports = {
  welcomeHTML,
  activationHTML,
  passwordChangedHTML,
  promoHTML,
};
