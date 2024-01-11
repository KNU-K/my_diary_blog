const bcrypt = require("bcrypt");
bcrypt.genSalt;
class CryptoUtil {
  constructor(round) {
    this.salt = bcrypt.genSaltSync(round);
  }
  async hash(plainText) {
    try {
      return await bcrypt.hash(plainText, this.salt);
    } catch (e) {
      throw e;
    }
  }
  async compare(plainText, hashText) {
    try {
      return await bcrypt.compare(plainText, hashText);
    } catch (e) {
      throw e;
    }
  }
}

module.exports = CryptoUtil;
