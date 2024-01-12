const router = require("express").Router();
const user = require("./user.index");
const board = require("./board.index");
const comment = require("./comment.index");
const auth = require("./auth.index");
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
router.use("/board/:boardId/comment", comment);
router.use("/auth", auth);
module.exports = router;
