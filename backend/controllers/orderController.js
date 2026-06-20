const Order = require("../models/Order");

// CREATE ORDER
exports.createOrder = async (req, res) => {
  try {
    const { items, totalPrice, fullName, phone, city, address, note } = req.body;

    const order = await Order.create({
      user: req.user._id,
      items,
      totalPrice,
      fullName,
      phone,
      city,
      address,
      note,
      status: "en attente"
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la création de la commande",
      error: error.message
    });
  }
};

// GET ALL ORDERS (Admin only) or own orders for regular user
exports.getOrders = async (req, res) => {
  try {
    const ADMIN_EMAILS = ['admin@aamotors.ma', 'eelmadam2004@gmail.com'];
    const isAdmin = req.user && (
      ADMIN_EMAILS.includes(req.user.email) ||
      (req.user.email && req.user.email.toLowerCase().includes('admin'))
    );

    const query = isAdmin ? {} : { user: req.user._id };

    const orders = await Order.find(query)
      .populate("user", "name email role")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des commandes",
      error: error.message
    });
  }
};

// UPDATE ORDER STATUS (Admin only)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!["en attente", "confirmé", "livré", "annulé"].includes(status)) {
      return res.status(400).json({ message: "Statut invalide" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("user", "name email role");

    if (!order) {
      return res.status(404).json({ message: "Commande non trouvée" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la mise à jour du statut",
      error: error.message
    });
  }
};
