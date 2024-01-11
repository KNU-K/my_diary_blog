const userService = require("../services/user.service");

const createUser = async (req, res, next) => {
  try {
    const user = req.body;
    await userService.create(user);
    res.send({ msg: "Successfully create user" });
  } catch (e) {
    next(e);
  }
};
const findUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const foundUser = userId
      ? await userService.findUserByUserId(userId)
      : await userService.findAllUser();

    res.send(foundUser);
  } catch (e) {
    next(e);
  }
};
const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const updatedUser = req.body;
    await userService.updateUserByUserId(userId, updatedUser);
    res.send({ msg: "successfully update user" });
  } catch (e) {
    next(e);
  }
};
const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    await userService.deleteUserByUserId(userId);
    res.send({ msg: "successfully delete user" });
  } catch (e) {
    next(e);
  }
};
module.exports = { updateUser, findUser, createUser, updateUser, deleteUser };
