const { userModel } = require("../models");
const { InternalServerError } = require("../utils/errors");

const findAll = async () => {
  try {
    const users = await userModel.findMany({});
    return users;
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};
const findOne = async (params) => {
  try {
    const user = await userModel.findFirst({
      where: params,
    });
    return user;
  } catch (error) {
    throw new InternalServerError("User is not found");
  }
};
const countUsers = async () => {
  try {
    const users = await userModel.count();
    return users;
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};
const insertOne = async (userData) => {
  try {
    const newUser = await userModel.create({
      data: userData,
    });
    return newUser;
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};
const updateUser = async (userData) => {
  try {
    const updatedUser = await userModel.update({
      where: {
        email: userData.email,
      },
      data: userData,
    });
    return updatedUser;
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};

module.exports = {
  findAll,
  findOne,
  insertOne,
  updateUser,
  countUsers,
};
