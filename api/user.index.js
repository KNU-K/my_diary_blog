const {
  createUser,
  findUser,
  deleteUser,
  updateUser,
  createFollowing,
  findFollower,
  findFollowing,
  deleteFollower,
  deleteFollowing,
} = require("../controllers/user.controller");
const guardMiddleware = require("../middlewares/guard.middleware");

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
router.put("/:userId", guardMiddleware, updateUser);
router.delete("/:userId", guardMiddleware, deleteUser);

router.post("/:userId/following", guardMiddleware, createFollowing);
router.get("/:userId/follower", findFollower);
router.get("/:userId/following", findFollowing);
router.delete("/:userId/following", guardMiddleware, deleteFollowing);
module.exports = router;
