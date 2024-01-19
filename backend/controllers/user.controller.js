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
const updateProfile = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { introduction } = req.body;
    console.log(introduction);
    const { destination, filename } = req.file;
    const staticImgPath = destination + filename;
    /**TODO:
     * 1. save only introduction
     * 2. save only image
     * 3. save both introduction and image
     * 4. not exist all file
     */
    await userService.updateProfileByUserId(userId, {
      image: staticImgPath,
      introduction: introduction,
    });
    res.send({ msg: "successfully update user's profile" });
  } catch (e) {
    next(e);
  }
};
const findProfile = async (req, res, next) => {
  try {
    const { userId } = req.params;
    let foundProfile = await userService.findProfileByUserId(userId);
    foundProfile.image = `http://localhost:8080/${foundProfile.image}`;
    res.send(foundProfile);
  } catch (e) {
    next(e);
  }
};
const findProfile2 = async (req, res, next) => {
  try {
    console.log("a");
    const { u_id } = req.user;
    console.log(req.user);
    let foundProfile = await userService.findProfileByUserId(u_id);
    foundProfile.image = `http://localhost:8080/${foundProfile.image}`;
    res.send(foundProfile);
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
    const { targetUserId } = req.body;
    console.log(userId, targetUserId);
    if (userId !== req.user.u_id)
      throw new Error("you're not exist access permission");

    await userService.deleteFollowing(userId, targetUserId);
    res.send({ msg: "successfully cancel following" });
  } catch (e) {
    next(e);
  }
};
const findBoardByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const foundBoard = await userService.findBoardByUserId(userId);
    res.send(foundBoard);
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
  findProfile,
  updateProfile,
  createFollowing,
  findFollowing,
  findProfile2,
  findFollower,
  deleteFollowing,
  findBoardByUserId,
};
