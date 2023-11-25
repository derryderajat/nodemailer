// business logic user

const {
  insertOne,
  updateUser,
  findAll,
  findOne,
} = require("../repositories/user.repository");
const Joi = require("joi");
const {
  BadRequestError,
  DuplicateError,
  NotFoundError,
  InternalServerError,
} = require("../utils/errors");
const PasswordHasher = require("../utils/bcrypt");
const { congratsUserActivation } = require("../libs/mailer");
const { createToken } = require("../utils/jwt");
// service register

const register = async (userData) => {
  const newUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(6)
      .regex(/(?=.*[a-z])/)
      .regex(/(?=.*[A-Z])/)
      .regex(/(?=.*\d)/)
      .required(),
    name: Joi.string().min(1).required(),
    umur: Joi.number().required(),
    dob: Joi.date(),
    profile_picture: Joi.string().allow(""),
  });
  // validating user input
  try {
    await newUserSchema.validateAsync(userData);
    // if (error) throw new BadRequestError(error);
  } catch (validationError) {
    throw new BadRequestError(validationError.message);
  }
  try {
    const emailIsExists = await findOne({ email: userData.email });
    // console.log(usernameIsExists, emailIsExists);
    if (emailIsExists) {
      throw new DuplicateError("Data already exists");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }

  try {
    const passwordHasher = new PasswordHasher();
    const hashedPassword = await passwordHasher.hashPassword(userData.password);
    userData.password = hashedPassword;
    // change format date

    const newUser = await insertOne(userData);

    const userPreview = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      id_verified: newUser.is_verified,
    };
    return userPreview;
  } catch (error) {
    throw error;
  }
};
// service sign in
const signinUser = async (email, password) => {
  try {
    // check is user exist
    if (!email && !password) {
      throw new BadRequestError("email or password can't be empty");
    }
    // check if user is exists
    const user = await findOne({ email: email });
    if (!user) throw new NotFoundError("email is not found");
    // console.log(user);
    // comparing password
    if (!user.is_verified)
      throw new BadRequestError("Email has not been verified");
    const passwordHasher = new PasswordHasher();
    let isPasswordCorrect = await passwordHasher.comparePassword(
      password,
      user.password
    );
    if (!isPasswordCorrect) {
      throw new BadRequestError("Password is incorrect");
    }

    // set payload
    let payload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };
    // 1 day expired

    let token = await createToken(payload);
    return { access_token: token, data: payload };
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};
const activateUserAccount = async (email) => {
  const isUserExists = await findOne({ email: email });
  // console.log(isUserExists);

  if (!isUserExists) {
    throw new NotFoundError("user is not registered");
  } else {
    if (isUserExists.is_verified) {
      return { message: "user is already active" };
    }
    const is_verified = true;
    const userData = { email: email, is_verified: is_verified };
    const updatedUser = await updateUser(userData);
    if (updatedUser.is_verified) {
      await congratsUserActivation(email);
      return { message: "user is activated" };
    }
  }
};

const getAllUsers = async () => {
  const users = await findAll();

  const filteredUserData = users
    .filter((user) => user.is_verified) // only verified account is displayed
    .map((user) => ({
      email: user.email,
      name: user.name,
      profile_picture: user.profile_picture,
      is_verified: user.is_verified,
    }));

  return filteredUserData;
};

const changePassword = async (email, oldPassword, newPassword) => {
  try {
    const isUserExists = await findOne({ email: email });

    const passwordSchema = Joi.object({
      password: Joi.string()
        .min(6)
        .regex(/(?=.*[a-z])/)
        .regex(/(?=.*[A-Z])/)
        .regex(/(?=.*\d)/)
        .required(),
    });

    // validating user input
    if (oldPassword === newPassword) {
      throw new BadRequestError("New password shouldn't same as the old one!");
    }

    // validating user input
    try {
      await passwordSchema.validateAsync({ password: newPassword });
    } catch (validationError) {
      throw new BadRequestError(validationError.message);
    }
    if (isUserExists) {
      const passwordHasher = new PasswordHasher();
      const hashedPassword = await passwordHasher.hashPassword(newPassword);
      const samePassword = await passwordHasher.comparePassword(
        oldPassword,
        isUserExists.password
      );
      console.log(samePassword, oldPassword, isUserExists.password);
      if (!samePassword) throw new BadRequestError("Old password is incorrect");
      const userData = {
        email: email,
        password: hashedPassword,
      };
      const updatedUser = await updateUser(userData);

      return { message: "Password successfully changed" };
    }
  } catch (error) {
    throw error;
  }
};

const updateProfileUser = async (dataUser) => {
  // const user = await findOne({ email: dataUser.email });
  // if (!user) throw new NotFoundError("email is not found");
  const { profile_picture, ...rest } = dataUser;
  const payload = { profile_picture: profile_picture, email: dataUser.email };
  try {
    const updatedUser = await updateUser(payload);
    const data = {
      name: updatedUser.name,
      email: updatedUser.email,
      profile_picture: updatedUser.profile_picture,
    };

    return data;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  register,
  activateUserAccount,
  getAllUsers,
  signinUser,
  changePassword,
  updateProfileUser,
};
