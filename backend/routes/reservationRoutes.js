const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createReservation,
  getReservations,
  confirmReservation,
  getMyReservations,
  getStats,
  cancelReservation
} = require("../controllers/reservationController");

router.post("/", protect, createReservation);

router.put("/:id/confirm", protect, confirmReservation);

router.put("/:id/cancel", protect, cancelReservation);

router.get("/", protect, getReservations);

router.get("/my", protect, getMyReservations);

router.get("/stats", protect, getStats);

module.exports = router;