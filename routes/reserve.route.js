const express = require("express");
const router = express.Router();
const {
  createReservation,
  deleteReservation,
  reservation,
} = require("../controllers/reserve.controller.js");

router.get("/reservations", reservation);
router.post("/createReservation", createReservation);
router.delete("/delt_reservations/:reservationId", deleteReservation);

module.exports = router;
