const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("MongoDB connecté");
  } catch (error) {
    console.error("Erreur MongoDB:", error.message);
    console.log("Le serveur continue de tourner pour permettre les tests de l'IA...");
  }
};

module.exports = connectDB;