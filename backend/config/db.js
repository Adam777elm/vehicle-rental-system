const mongoose = require("mongoose");
const Vehicle = require("../models/Vehicle");

const RENTAL_SEED = [
  { name: "MT-07", category: "roadster", price: 900, type: "rent", brand: "Yamaha", description: "Location MT-07 — AA Motors", availability: true, image: "https://moto-nautika.com/wp-content/uploads/2024/10/Yamaha-MT-07.jpg" },
  { name: "YZF-R7", category: "sport", price: 1100, type: "rent", brand: "Yamaha", description: "Location YZF-R7 — AA Motors", availability: true, image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2024/YZF700R7/2024-Yamaha-YZF700R7-EU-Icon_Blue-Studio-001-03.jpg" },
  { name: "TRACER 9", category: "touring", price: 1100, type: "rent", brand: "Yamaha", description: "Location TRACER 9 — AA Motors", availability: true, image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2025/MT09ATR/2025-Yamaha-MT09ATR-EU-Redline-360-Degrees-001-03_Mobile.jpg" },
  { name: "TRACER 7 GT", category: "touring", price: 950, type: "rent", brand: "Yamaha", description: "Location TRACER 7 GT — AA Motors", availability: true, image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2026/MT07TRGTS/2026-Yamaha-MT07TRGTS-EU-Icon_Performance-360-Degrees-001-03_Mobile.jpg" },
  { name: "Ténéré 700", category: "offroad", price: 1050, type: "rent", brand: "Yamaha", description: "Location Ténéré 700 — AA Motors", availability: true, image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2024/XTZ700D/2024-Yamaha-XTZ700D-EU-Icon_Blue-360-Degrees-001-03_Mobile.jpg" },
  { name: "TMAX 560", category: "scooter", price: 1200, type: "rent", brand: "Yamaha", description: "Location TMAX 560 — AA Motors", availability: true, image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2026/XP500A/2026-Yamaha-XP500A-EU-Icon_Blue-360-Degrees-001-03_Mobile.jpg" },
  { name: "NMAX 125", category: "scooter", price: 450, type: "rent", brand: "Yamaha", description: "Location NMAX 125 — AA Motors", availability: true, image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2026/G125YM/2026-Yamaha-G125YM-EU-Icon_Blue-360-Degrees-001-03_Mobile.jpg" }
];

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connecté");

    // Clean up rental vehicles that are NOT in the allowed list (removes Tracer 9 GT, R1, etc.)
    const allowedNames = RENTAL_SEED.map(item => item.name);
    await Vehicle.deleteMany({
      type: "rent",
      name: { $nin: allowedNames }
    });
    console.log("Base de données nettoyée des autres modèles de location.");

    // Sync/Upsert the allowed rental vehicles
    for (const item of RENTAL_SEED) {
      await Vehicle.findOneAndUpdate(
        { name: item.name, type: "rent" },
        { $set: item },
        { upsert: true, new: true }
      );
      console.log(`Véhicule de location synchronisé : ${item.name}`);
    }
  } catch (error) {
    console.error("Erreur MongoDB:", error.message);
    console.log("Le serveur continue de tourner pour permettre les tests de l'IA...");
  }
};

module.exports = connectDB;