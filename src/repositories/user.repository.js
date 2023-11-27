const { userModel } = require("../models");
const { InternalServerError, NotFoundError } = require("../utils/errors");

const findAll = async () => {
  try {
    const users = await userModel.findMany({});
    return users;
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};
const findOne = async (params) => {
  const user = await userModel.findFirst({
    where: params,
  });
  return user;
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
const broadCastPromo = async () => {
  try {
    const users = await userModel.findMany({
      where: {
        role: "USER",
      },
    });
    return users;
  } catch (error) {
    throw NotFoundError("Users is not found");
  }
};
module.exports = {
  broadCastPromo,
  findAll,
  findOne,
  insertOne,
  updateUser,
  countUsers,
};
