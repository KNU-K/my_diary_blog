const router = require("express").Router();
const user = require("./user.index");
const board = require("./board.index");
const comment = require("./comment.index");
const auth = require("./auth.index");
const { Board } = require("../models");
router.use("/user", user);
router.use("/board", board);
router.use("/board/:boardId/comment", comment);
router.use("/auth", auth);
router.post("/test", async (req, res) => {
  console.log(req.body);
  await Board.create({
    b_title: "test",
    b_contents: req.body.a,
    u_id: "john_doe",
  });
  res.send("good");
});
module.exports = router;
