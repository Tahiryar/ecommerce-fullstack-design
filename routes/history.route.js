const express = require("express");
const { createHistory, history } = require("../controllers/history.controller");
const router = express.Router();

router.get("/history", history);
router.post("/addhistory", createHistory);

module.exports = router;
