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

    if (req.user.u_id !== userId) throw new Error("not Matched User");
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

    if (req.user.u_id !== userId) throw new Error("not Matched User");
    await userService.deleteUserByUserId(userId);
    res.send({ msg: "successfully delete user" });
  } catch (e) {
    next(e);
  }
};
const createFollowing = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { targetUserId } = req.body;
    if (userId !== req.user.u_id)
      throw new Error("you're not exist access permission");
    await userService.createFollowing(userId, targetUserId);
    res.send({ msg: "successfully following" });
  } catch (e) {
    next(e);
  }
};
const findFollowing = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const followingList = await userService.findFollowingByUserId(userId);
    res.send(followingList);
  } catch (e) {
    next(e);
  }
};
const findFollower = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const followerList = await userService.findFollowerByUserId(userId);
    res.send(followerList);
  } catch (e) {
    next(e);
  }
};
const deleteFollowing = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (userId !== req.user.u_id)
      throw new Error("you're not exist access permission");

    await userService.deleteFollowing(userId);
    res.send({ msg: "successfully cancel following" });
  } catch (e) {
    next(e);
  }
};
module.exports = {
  updateUser,
  findUser,
  createUser,
  updateUser,
  deleteUser,
  createFollowing,
  findFollowing,
  findFollower,
  deleteFollowing,
};
