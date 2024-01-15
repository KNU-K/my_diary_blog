const authService = require("../services/auth.service");
const login = async (req, res, next) => {
  try {
    const { u_id, u_password } = req.body;
    const { accessToken, refreshToken } = await authService.login(
      u_id,
      u_password
    );
    console.log(accessToken);
    console.log(refreshToken);
    res.send({ accessToken: accessToken, refreshToken: refreshToken });
  } catch (e) {
    next(e);
  }
};
const refresh = async (err, req, res, next) => {
  try {
    if (err.message !== "jwt expired") throw err;
    const { refreshToken } = req.body;
    if (!refreshToken) throw new Error("not exist refresh token");
    const resData = await authService.verifyRefreshTokenAndReIssue(
      req.user,
      refreshToken
    );
    res.send(resData);
  } catch (e) {
    next(e);
  }
};
const logout = async (req, res, next) => {
  try {
    //delete token
    if (!req.user) throw Error("isn't already login");
    const { refreshToken } = req.body;
    if (!refreshToken) throw new Error("not exist refresh token");
    await authService.logout(req.user.u_id, refreshToken);
  } catch (e) {
    next(e);
  }
};

module.exports = { login, refresh, logout };
