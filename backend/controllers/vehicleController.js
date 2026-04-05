const Vehicle = require("../models/Vehicle");

// Ajouter un véhicule
exports.createVehicle = async (req, res) => {
  try {
    const vehicleData = req.body;

    if (req.file) {
      vehicleData.image = req.file.filename;
    }

    const vehicle = new Vehicle(vehicleData);

    await vehicle.save();

    res.status(201).json(vehicle);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la création du véhicule",
      error: error.message,
    });
  }
};

// Voir tous les véhicules
exports.getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();

    res.json(vehicles);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération",
      error: error.message,
    });
  }
};

// Voir un véhicule par ID
exports.getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        message: "Véhicule non trouvé",
      });
    }

    res.json(vehicle);
  } catch (error) {
    res.status(500).json({
      message: "Erreur",
      error: error.message,
    });
  }
};

// Supprimer un véhicule
exports.deleteVehicle = async (req, res) => {
  try {
    await Vehicle.findByIdAndDelete(req.params.id);

    res.json({
      message: "Véhicule supprimé",
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur",
      error: error.message,
    });
  }
};

// Recherche (search bar)
exports.searchVehicles = async (req, res) => {
  try {
    const keyword = req.query.keyword;

    const vehicles = await Vehicle.find({
      name: { $regex: keyword, $options: "i" },
    });

    res.json(vehicles);
  } catch (error) {
    res.status(500).json({
      message: "Erreur de recherche",
      error: error.message,
    });
  }
};
// Modifier un véhicule
exports.updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!vehicle) {
      return res.status(404).json({
        message: "Véhicule non trouvé",
      });
    }

    res.json(vehicle);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la mise à jour",
      error: error.message,
    });
  }
};