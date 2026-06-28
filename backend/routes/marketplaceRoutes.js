const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  getAllBikes,
  createBike,
  deleteBike,
  updateBikeStatus,
} = require("../controllers/marketplaceController");

// GET all marketplace listings
router.get("/", getAllBikes);

// POST a new listing
router.post("/", protect, createBike);

// DELETE a listing
router.delete("/:id", protect, deleteBike);

// PUT update listing moderation status
router.put("/:id/status", protect, updateBikeStatus);

module.exports = router;
