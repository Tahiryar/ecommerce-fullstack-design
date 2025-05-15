const express = require("express");
const { login, logout } = require("../controllers/auth.controller.js");
const router = express.Router();
const verifyToken = require("../middlewares/jwt.middleware.js");
router.post("/login", login);
router.get("/authcheck", verifyToken, (req, res) => {
  res.status(200).json({ authorized: true });
});
router.post("/logout", verifyToken, logout);
// Route to check authorization status

module.exports = router;
