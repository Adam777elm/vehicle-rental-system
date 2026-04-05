const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "sport",
        "touring",
        "scooter",
        "offroad",
        "quad",
        "jetski",
        "equipment",
      ],
    },

    brand: {
      type: String,
    },

    description: {
      type: String,
    },

    price: {
      type: Number,
      required: true,
    },

    type: {
      type: String,
      enum: ["sale", "rent"],
      required: true,
    },

    availability: {
      type: Boolean,
      default: true,
    },

    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Vehicle", vehicleSchema);