const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  createBooking,
  getBookings,
  updateBookingStatus,
} = require("../controllers/bookingController");

// Public route to submit a booking
router.post("/", createBooking);

// Protected routes for Admin
router.get("/", protect, getBookings);
router.put("/:id/status", protect, updateBookingStatus);

module.exports = router;
