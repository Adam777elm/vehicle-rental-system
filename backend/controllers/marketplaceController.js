const MarketplaceBike = require("../models/MarketplaceBike");

// GET all marketplace listings (filterable by status)
exports.getAllBikes = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) {
      filter.status = req.query.status;
    }
    const bikes = await MarketplaceBike.find(filter).sort({ createdAt: -1 });
    res.json(bikes);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des annonces",
      error: error.message,
    });
  }
};

// CREATE a new used bike listing
exports.createBike = async (req, res) => {
  try {
    const bikeData = req.body;
    
    // Add publisher email from authenticated user token
    if (req.user) {
      bikeData.publisherEmail = req.user.email;
    }

    const bike = new MarketplaceBike(bikeData);
    await bike.save();

    res.status(201).json(bike);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la publication de l'annonce",
      error: error.message,
    });
  }
};

// DELETE a marketplace listing
exports.deleteBike = async (req, res) => {
  try {
    const bike = await MarketplaceBike.findById(req.params.id);

    if (!bike) {
      return res.status(404).json({ message: "Annonce non trouvée" });
    }

    // Authorization check: only original publisher or admin can delete
    const isOwner = req.user && req.user.email === bike.publisherEmail;
    const isAdmin = req.user && (req.user.role === "admin" || req.user.email.toLowerCase().includes("admin") || req.user.email === "eelmadam2004@gmail.com");

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Action non autorisée" });
    }

    await MarketplaceBike.findByIdAndDelete(req.params.id);
    res.json({ message: "Annonce supprimée avec succès" });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la suppression de l'annonce",
      error: error.message,
    });
  }
};

// UPDATE a marketplace listing status (Moderation: Approuvé / Refusé)
exports.updateBikeStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["pending", "approuvé", "refusé"].includes(status)) {
      return res.status(400).json({ message: "Statut de modération invalide" });
    }

    const bike = await MarketplaceBike.findById(req.params.id);

    if (!bike) {
      return res.status(404).json({ message: "Annonce non trouvée" });
    }

    // Role check: Admin only
    const isAdmin = req.user && (req.user.role === "admin" || req.user.email.toLowerCase().includes("admin") || req.user.email === "eelmadam2004@gmail.com");
    if (!isAdmin) {
      return res.status(403).json({ message: "Action réservée aux administrateurs" });
    }

    bike.status = status;
    await bike.save();

    res.json(bike);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la mise à jour du statut de l'annonce",
      error: error.message,
    });
  }
};
