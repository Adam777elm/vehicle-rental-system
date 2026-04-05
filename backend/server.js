const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const reservationRoutes = require("./routes/reservationRoutes");
const connectDB = require("./config/db");

const vehicleRoutes = require("./routes/vehicleRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/vehicles", vehicleRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reservations", reservationRoutes);
app.get("/", (req, res) => {
  res.send("API fonctionne");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Serveur lancé sur port " + PORT);
});