const { ACCESS_TOKEN_SECRET } = require("../backend/config/env-config");
const TokenUtil = require("../utils/token.util");
const tokenUtil = new TokenUtil(ACCESS_TOKEN_SECRET);
module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]
      ? req.headers["authorization"].split(" ")
      : null;
    if (!token) throw new Error("token isn't exist");
    if (token[0] != "Bearer") throw new Error("invalid Token");
    await tokenUtil.verifyToken(token[1]);
    const payload = await tokenUtil.decodeToken(token[1]);
    req.user = {
      u_id: payload.u_id,
      u_name: payload.u_name,
    };
    next();
  } catch (e) {
    next(e);
  }
};
