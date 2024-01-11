const router = require("express").Router();
const user = require("./user.index");
/** controller user
 *
 * @FUNC1 create
 * @FUNC2
 * @FUNC3
 * @FUNC4
 * @FUNC5
 */
router.use("/user", user);
module.exports = router;
