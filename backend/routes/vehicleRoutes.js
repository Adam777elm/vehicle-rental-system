const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const protect = require("../middleware/authMiddleware");


const {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  deleteVehicle,
  searchVehicles,
  updateVehicle,
} = require("../controllers/vehicleController");
router.post(
  "/",
  protect,
  upload.single("image"),
  createVehicle
);
// Ajouter un véhicule
router.post("/", createVehicle);

// Voir tous les véhicules
router.get("/", getAllVehicles);

// Recherche (search bar)
router.get("/search", searchVehicles);

// Voir un véhicule par ID
router.get("/:id", getVehicleById);

// Supprimer un véhicule
router.delete("/:id", deleteVehicle);

router.put("/:id", updateVehicle);

module.exports = router;
