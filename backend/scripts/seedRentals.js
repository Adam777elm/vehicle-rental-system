/**
 * Optionnel : peuple MongoDB avec les véhicules location du catalogue.
 * Usage : node scripts/seedRentals.js  (depuis backend/)
 */
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../.env") });

const Vehicle = require("../models/Vehicle");

const RENTALS = [
  { name: "TMAX 560", category: "scooter", price: 1200, type: "rent", image: "1776370716709-Loca3.jpg" },
  { name: "XMAX 300", category: "scooter", price: 750, type: "rent" },
  { name: "MT-07", category: "roadster", price: 900, type: "rent" },
  { name: "TRACER 9", category: "touring", price: 1100, type: "rent" },
  { name: "Ténéré 700", category: "offroad", price: 1050, type: "rent" },
  { name: "NMAX 125", category: "scooter", price: 450, type: "rent" },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  for (const item of RENTALS) {
    const exists = await Vehicle.findOne({ name: item.name, type: "rent" });
    if (!exists) {
      await Vehicle.create({
        ...item,
        brand: "Yamaha",
        description: `Location ${item.name} — AA Motors`,
        availability: true,
      });
      console.log("Créé:", item.name);
    } else {
      console.log("Déjà présent:", item.name);
    }
  }
  process.exit(0);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
