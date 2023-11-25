const bcrypt = require("bcrypt");

class PasswordHasher {
  #saltRounds = 4;

  #generateSalt = async () => {
    return await bcrypt.genSalt(this.#saltRounds);
  };

  hashPassword = async (password) => {
    const salt = await this.#generateSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  };

  comparePassword = async (password, hashedPassword) => {
    const passwordIsCorrect = await bcrypt.compare(password, hashedPassword);
    return passwordIsCorrect;
  };
}

module.exports = PasswordHasher;
