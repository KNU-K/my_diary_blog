const { User, Follow, Profile } = require("../models");
class UserService {
  users = [];
  constructor() {
    this.init()
      .then((users) => {
        this.users = users;
      })
      .catch((e) => {
        throw e;
      });
  }
  async create(user) {
    try {
      const createdUser = await User.create(user);
      const createdProfile = await Profile.create({ u_id: user.u_id });
      console.log(createdProfile);
      //users 구조 변경할 수도
      this.users.push(createdUser.dataValues);

      return createdUser;
    } catch (e) {
      throw e;
    }
  }

  async findUserByUserId(userId) {
    try {
      const foundUser = this.users.find((user) => user.u_id == userId);
      if (!foundUser) throw new Error("not found user");
      return foundUser;
    } catch (e) {
      throw e;
    }
  }
  async init() {
    try {
      const foundUser = await User.findAll();
      return foundUser.map((user) => user.dataValues);
    } catch (e) {
      throw e;
    }
  }
  async findAllUser() {
    try {
      return this.users;
    } catch (e) {
      throw e;
    }
  }

  async updateUserByUserId(userId, user) {
    try {
      await User.update(user, { where: { u_id: userId } });
      const updatedUser = (await User.findByPk(userId)).dataValues;
      this.users = this.users.map((user) => {
        if (user.u_id === userId) {
          return updatedUser;
        }
        return user;
      });
    } catch (e) {
      throw e;
    }
  }
  async deleteUserByUserId(userId) {
    try {
      await User.destroy({ where: { u_id: userId } });
      this.users = this.users.filter((user) => {
        user.u_id !== userId;
      });
    } catch (e) {
      throw e;
    }
  }
  /**@PROFILE_PART */
  async findProfileByUserId(userId) {
    try {
      const foundProfile = await Profile.findAll({
        where: {
          u_id: userId,
        },
      });

      return foundProfile[0];
    } catch (e) {
      throw e;
    }
  }
  async updateProfileByUserId(userId, profile) {
    try {
      await Profile.update(profile, { where: { u_id: userId } });
    } catch (e) {
      throw e;
    }
  }

  /**@FOLLOW_PART */
  async createFollowing(userId, targetUserId) {
    try {
      await Follow.create({ u_id: userId, following_id: targetUserId });
    } catch (e) {
      throw e;
    }
  }
  async findFollowerByUserId(userId) {
    try {
      const follows = await Follow.findAll({
        where: {
          following_id: userId,
        },
      });

      return follows.map((follow) => follow.dataValues);
    } catch (e) {
      throw e;
    }
  }
  async findFollowingByUserId(userId) {
    try {
      const follows = await Follow.findAll({
        where: {
          u_id: userId,
        },
      });

      return follows.map((follow) => follow.dataValues);
    } catch (e) {
      throw e;
    }
  }

  async deleteFollowing(userId) {
    try {
      await Follow.destroy({
        where: {
          u_id: userId,
        },
      });
    } catch (e) {
      throw e;
    }
  }
}
const userService = new UserService();
module.exports = userService;
