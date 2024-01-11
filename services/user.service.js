const { User } = require("../models");

class UserService {
  constructor() {}
  async create(user) {
    try {
      const createdUser = await User.create(user);
      return createdUser;
    } catch (e) {
      throw e;
    }
  }

  async findUserByUserId(userId) {
    try {
      const foundUser = (await User.findByPk(userId)).dataValues;
      return foundUser;
    } catch (e) {
      throw e;
    }
  }
  async findAllUser() {
    try {
      const foundUser = await User.findAll();
      console.log(foundUser);
      return foundUser;
    } catch (e) {
      throw e;
    }
  }

  async updateUserByUserId(userId, user) {
    try {
      await User.update(user, { where: { u_id: userId } });
    } catch (e) {
      throw e;
    }
  }
  async deleteUserByUserId(userId) {
    try {
      await User.destroy({ where: { u_id: userId } });
    } catch (e) {
      throw e;
    }
  }
}
const userService = new UserService();
module.exports = userService;
