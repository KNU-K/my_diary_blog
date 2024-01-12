const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} = require("../config/env-config");
const { User } = require("../models");
const TokenUtil = require("../utils/token.util");
const redisClient = require("../config/redis-config").client;
//this secret env
const tokenUtil1 = new TokenUtil(ACCESS_TOKEN_SECRET);
const tokenUtil2 = new TokenUtil(REFRESH_TOKEN_SECRET);
class AuthService {
  constructor() {}
  verify() {}
  async login(u_id, u_password) {
    try {
      const user = await User.findByPk(u_id);
      if (!user) throw new Error("not matched userId");
      if (user.dataValues.u_password != u_password)
        throw new Error("not matched password");
      //generate token
      const accessToken = await tokenUtil1.generateToken(
        {
          u_id: user.dataValues.u_id,
          u_name: user.dataValues.u_name,
        },
        "10m"
      );
      const refreshToken = await tokenUtil2.generateToken(
        {
          u_id: user.dataValues.u_id,
          u_name: user.dataValues.u_name,
        },
        "7d"
      );
      await redisClient.set(user.dataValues.u_id, refreshToken);
      await redisClient.expire(user.dataValues.u_id, 7 * 24 * 60);
      return {
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
    } catch (e) {
      throw e;
    }
  }
  async logout(userId) {
    try {
      await redisClient.del(userId);
    } catch (e) {
      throw e;
    }
  }
}
const authService = new AuthService();
module.exports = authService;
