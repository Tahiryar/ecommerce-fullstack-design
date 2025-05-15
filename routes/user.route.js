const express = require("express");
const router = express.Router();
const {
  createUser,
  users,
  getUserDetails,
  updateUserStatus,
  deleteUser,
  updateUser,
  updateUserPassword,
  toggleAccountLock,
  getUserProfile,
} = require("../controllers/user.controller.js");

router.get("/users", users);
router.post("/createUser", createUser);
router.put("/updateUser/:userId", updateUser);
router.delete("/deleteUser/:userId", deleteUser);
router.put("/update-password", updateUserPassword);
router.put("/updateUserStatus", updateUserStatus);

router.get("/user/:id", getUserDetails);
router.get("/profile", getUserProfile);
router.put("/lockAccount", toggleAccountLock);

module.exports = router;
