const authService = require("../services/auth.service");
const login = async (req, res, next) => {
  try {
    const { u_id, u_password } = req.body;
    const { accessToken, refreshToken } = await authService.login(
      u_id,
      u_password
    );
    //usage redis
    res.send({ accessToken: accessToken, refreshToken: refreshToken });
  } catch (e) {
    next(e);
  }
};
const logout = async (req, res, next) => {
  try {
    //delete token
    if (!req.user) throw Error("isn't already login");
    await authService.logout(req.user.u_id);
  } catch (e) {
    next(e);
  }
};

module.exports = { login, logout };
