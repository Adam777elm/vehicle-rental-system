import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CSS/Cart.css";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("pfa_cart") || "[]");
    setCartItems(items);
  }, []);

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("pfa_cart", JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => {
      const price = parseInt(item.price.replace(/\D/g, ''), 10);
      return acc + (price * item.quantity);
    }, 0).toLocaleString();
  };

  return (
    <div className="cart-page">
      <div className="cart-top-red-bar"></div>
      
      <div className="cart-container">
        <h1 className="cart-title">VOTRE PANIER</h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart-section">
            <div className="empty-icon">🛒</div>
            <p className="empty-msg">Votre panier est actuellement vide.</p>
            <Link to="/motos" className="btn-return">RETOUR À LA BOUTIQUE</Link>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item-card">
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <p className="item-cat">{item.category}</p>
                    <p className="item-price">{item.price}</p>
                  </div>
                  <div className="cart-item-qty">
                    <span>Quantité: {item.quantity}</span>
                  </div>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h3>RÉSUMÉ</h3>
              <div className="summary-row">
                <span>Sous-total</span>
                <span>{calculateTotal()} DHS</span>
              </div>
              <div className="summary-row total">
                <span>TOTAL</span>
                <span>{calculateTotal()} DHS</span>
              </div>
              <button className="checkout-btn">COMMANDER</button>
              <Link to="/motos" className="continue-link">Continuer les achats</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;