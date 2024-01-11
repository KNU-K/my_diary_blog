const {
  createUser,
  findUser,
  deleteUser,
  updateUser,
} = require("../controllers/user.controller");

const router = require("express").Router();
/** controller user
 *
 * @FUNC1 create
 * @FUNC2 read (all, target)
 * @FUNC3 update Param���� userId body ���� �׸� ������ ������ ����
 * @FUNC4 delete param���� userId �޾Ƽ� ����
 *
 * @MIDDLEWARE auth middleware�� ������ �� �ְ� �ؾ���.
 */
router.post("/", createUser);
router.get("/", findUser);
router.get("/:userId", findUser);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);
module.exports = router;
