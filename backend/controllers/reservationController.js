const Reservation = require("../models/Reservation");
const Vehicle = require("../models/Vehicle");


// CREATE RESERVATION
exports.createReservation = async (req, res) => {
  try {

    const { vehicle, startDate, endDate } = req.body;

    const vehicleData =
      await Vehicle.findById(vehicle);

    if (!vehicleData) {
      return res.status(404).json({
        message: "Vehicle not found"
      });
    }

    // calcul prix
    const start = new Date(startDate);
    const end = new Date(endDate);

    const diffTime = Math.abs(end - start);

    const days = Math.ceil(
      diffTime / (1000 * 60 * 60 * 24)
    );

    const totalPrice =
      days * vehicleData.price;

    const reservation =
      await Reservation.create({
        user: req.user._id,
        vehicle,
        startDate,
        endDate,
        totalPrice,
        status: "pending"
      });

    res.status(201).json(reservation);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


// CONFIRM RESERVATION
exports.confirmReservation = async (req, res) => {
  try {

    const reservation =
      await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({
        message: "Reservation not found"
      });
    }

    const vehicle =
      await Vehicle.findById(reservation.vehicle);

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    const diffTime = Math.abs(end - start);

    const days = Math.ceil(
      diffTime / (1000 * 60 * 60 * 24)
    );

    reservation.totalPrice =
      days * vehicle.price;

    reservation.status = "confirmed";

    await reservation.save();

    res.json({
      message: "Reservation confirmed",
      reservation
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


// GET RESERVATIONS
exports.getReservations = async (req, res) => {
  try {

    const reservations = await Reservation.find()
      .populate("user")
      .populate("vehicle");

    res.json(reservations);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};
exports.getMyReservations = async (req, res) => {
  try {

    const reservations = await Reservation.find({
      user: req.user._id
    })
    .populate("vehicle");

    res.json(reservations);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

exports.getStats = async (req, res) => {
  try {

    const totalVehicles =
      await Vehicle.countDocuments();

    const totalReservations =
      await Reservation.countDocuments();

    const confirmed =
      await Reservation.countDocuments({
        status: "confirmed"
      });

    res.json({
      totalVehicles,
      totalReservations,
      confirmed
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};
exports.cancelReservation = async (req, res) => {
  try {

    const reservation =
      await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({
        message: "Reservation not found"
      });
    }

    reservation.status = "cancelled";

    await reservation.save();

    res.json({
      message: "Reservation cancelled",
      reservation
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};