const router = require("express").Router();
const user = require("./user.index");
const board = require("./board.index");
/** controller user
 *
 * @FUNC1 create
 * @FUNC2
 * @FUNC3
 * @FUNC4
 * @FUNC5
 */
router.use("/user", user);
router.use("/board", board);
module.exports = router;
