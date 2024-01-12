const { login, logout } = require("../controllers/auth.controller");
const guardMiddleware = require("../middlewares/guard.middleware");

const router = require("express").Router();

router.post("/login", login);
router.post("/logout", guardMiddleware, logout);

module.exports = router;
