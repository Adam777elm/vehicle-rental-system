const BookingRequest = require("../models/BookingRequest");

// @desc    Create a new booking request
// @route   POST /api/bookings
// @access  Public
const createBooking = async (req, res) => {
  try {
    const { nom, email, telephone, type, destination, message, prixTotal } = req.body;

    if (!nom || !email || !telephone || !destination) {
      return res.status(400).json({ message: "Veuillez fournir tous les champs obligatoires." });
    }

    const booking = await BookingRequest.create({
      nom,
      email,
      telephone,
      type: type || "Sur-mesure",
      destination,
      message: message || "",
      prixTotal: prixTotal || "",
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur lors de la création de la réservation" });
  }
};

// @desc    Get all booking requests
// @route   GET /api/bookings
// @access  Private/Admin
const getBookings = async (req, res) => {
  try {
    const bookings = await BookingRequest.find({}).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Private/Admin
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await BookingRequest.findById(req.params.id);

    if (booking) {
      booking.status = status;
      const updatedBooking = await booking.save();
      res.json(updatedBooking);
    } else {
      res.status(404).json({ message: "Réservation non trouvée" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = {
  createBooking,
  getBookings,
  updateBookingStatus,
};
