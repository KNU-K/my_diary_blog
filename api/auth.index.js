const { login, logout, refresh } = require("../controllers/auth.controller");
const guardMiddleware = require("../middlewares/guard.middleware");

const router = require("express").Router();

router.post("/login", login);
router.get("/refresh", guardMiddleware, refresh);
router.post("/logout", guardMiddleware, logout);

module.exports = router;
