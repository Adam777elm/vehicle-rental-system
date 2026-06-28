const mongoose = require("mongoose");

const marketplaceBikeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    mileage: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    condition: {
      type: String,
      required: true,
    },
    conditionLabel: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    specs: {
      engine: { type: String, default: "Non spécifié" },
      power: { type: String, default: "Non spécifié" },
      color: { type: String, default: "D'origine" },
      gearbox: { type: String, default: "Manuelle" },
      fuel: { type: String, default: "Essence" },
      owners: { type: String, default: "1ère Main" },
    },
    sellerName: {
      type: String,
      required: true,
    },
    sellerPhone: {
      type: String,
      required: true,
    },
    publisherEmail: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "approuvé", "refusé"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("MarketplaceBike", marketplaceBikeSchema);
