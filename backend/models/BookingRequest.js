const mongoose = require("mongoose");

const bookingRequestSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true },
    email: { type: String, required: true },
    telephone: { type: String, required: true },
    type: { type: String, enum: ["Trip", "Location", "Sur-mesure"], default: "Sur-mesure" },
    destination: { type: String, required: true }, // Nom du véhicule ou nom du Trip
    message: { type: String },
    prixTotal: { type: String }, // Peut être un String pour inclure la devise
    status: {
      type: String,
      enum: ["en attente", "confirmé", "annulé", "terminé"],
      default: "en attente",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("BookingRequest", bookingRequestSchema);
