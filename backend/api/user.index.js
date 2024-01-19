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
/**
 * @swagger
 * /user:
 *   get:
 *     description: Î™®Îì† ?ú†??? ?†ïÎ≥? return
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Hello, Swagger!
 */
/**
 * @swagger
 * /user:
 *  post:
 *     description: ?ú†??? ?Éù?Ñ±
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Greeting message created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Greeting created for {name}!
 *       400:
 *         description: Bad request, missing or invalid parameters
 */
/**
 * @swagger
 * /user/{userId}:
 *   get:
 *     description: Returns a personalized hello message
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The name to include in the hello message
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Hello, John!
 */
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
