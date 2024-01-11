const JWT = require("jsonwebtoken");

/**token generator that is based on JWT */
class TokenUtil {
  constructor(secret) {
    this.secret = secret;
  }
  async generateToken(payload, expiresIn) {
    try {
      const token = JWT.sign(payload, this.secret, {
        expiresIn: expiresIn,
      });
      return token;
    } catch (e) {
      throw e;
    }
  }
  async verifyToken(token) {
    try {
      JWT.verify(token, this.secret);
    } catch (e) {
      throw e;
    }
  }
  async decodeToken(token) {
    try {
      return JWT.decode(token);
    } catch (e) {
      throw e;
    }
  }
}

module.exports = TokenUtil;
