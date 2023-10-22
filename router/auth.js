const { login, register, checkAuth } = require("../controllers/auth");
const { verifyToken } = require("../middleware/VerifyToken");
const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
router.get("/checkAuth", verifyToken ,checkAuth);

module.exports = router;
