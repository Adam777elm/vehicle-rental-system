const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: String, required: true },
        quantity: { type: Number, required: true, default: 1 },
        image: { type: String },
        category: { type: String },
        type: { type: String },
        color: { type: String },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    note: {
      type: String,
    },
    status: {
      type: String,
      enum: ["en attente", "confirmé", "livré", "annulé"],
      default: "en attente",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
