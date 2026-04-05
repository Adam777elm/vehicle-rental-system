import React from "react";

import { Link } from "react-router-dom";
import "./Cart.css";

function Cart() {
  return (
    <div className="cart-container">
      {/* Top red bar */}
      <div className="cart-top-bar"></div>

      {/* Empty cart banner */}
      <div className="empty-cart-banner">
        <p className="empty-cart-text">
          Votre panier est actuellement vide.
        </p>
      </div>

      {/* Return to shop button */}
      <Link to="/" className="btn-return-shop">
        Retour À La Boutique
      </Link>
    </div>
  );
}

export default Cart;