const { multer } = require("../config/multer-config");
const {
  createUser,
  findUser,
  deleteUser,
  updateUser,
  createFollowing,
  findFollower,
  findFollowing,
  deleteFollowing,
  findProfile,
  updateProfile,
  findBoardByUserId,
  findProfile2,
} = require("../controllers/user.controller");
const guardMiddleware = require("../middlewares/guard.middleware");

const router = require("express").Router({ mergeParams: true });
router.post("/", createUser);
router.get("/", findUser);
router.get("/profile", guardMiddleware, findProfile2);

router.get("/:userId", findUser);
router.get("/:userId/board", findBoardByUserId);
router.put("/:userId", guardMiddleware, updateUser);
router.delete("/:userId", guardMiddleware, deleteUser);

router.post("/:userId/following", guardMiddleware, createFollowing);
router.get("/:userId/follower", findFollower);
router.get("/:userId/following", findFollowing);
router.delete("/:userId/following", guardMiddleware, deleteFollowing);

router.get("/:userId/profile", findProfile);

router.post(
  "/:userId/profile",
  guardMiddleware,
  multer.single("img"),
  updateProfile
);
module.exports = router;
