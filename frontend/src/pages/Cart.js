import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import "./CSS/Cart.css";

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [promoInput, setPromoInput] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState("");
  
  // Checkout Modal State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod"); // "cod" or "card"
  const [isProcessingCard, setIsProcessingCard] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    city: "",
    address: "",
    note: ""
  });
  const [checkoutError, setCheckoutError] = useState("");

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("pfa_cart") || "[]");
    setCartItems(items);

    // Auto-apply promo if user subscribed via PromoModal
    const savedPromo = localStorage.getItem("promo_code");
    const savedDiscount = localStorage.getItem("promo_discount");
    if (savedPromo === "AA3PROMO" && savedDiscount === "3") {
      setDiscountPercent(3);
      setPromoInput("AA3PROMO");
      setPromoMessage("Code promo de 3% appliqué automatiquement !");
    }
  }, []);

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("pfa_cart", JSON.stringify(updatedCart));
  };

  const getSubtotal = () => {
    return cartItems.reduce((acc, item) => {
      const price = parseInt(item.price.replace(/\D/g, ''), 10);
      return acc + (price * item.quantity);
    }, 0);
  };

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoInput.trim().toUpperCase() === "AA3PROMO") {
      setDiscountPercent(3);
      setPromoMessage("Code promo de 3% appliqué avec succès !");
      localStorage.setItem("promo_code", "AA3PROMO");
      localStorage.setItem("promo_discount", "3");
    } else {
      setPromoMessage("Code invalide. Essayez 'AA3PROMO'");
      setDiscountPercent(0);
    }
  };

  const subtotal = getSubtotal();
  const discountAmount = Math.round(subtotal * (discountPercent / 100));
  const finalTotal = subtotal - discountAmount;

  const handleCheckoutClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setPromoMessage("Veuillez vous connecter pour commander. Redirection...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      return;
    }
    setIsCheckoutOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    setCheckoutError("");

    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.city.trim() || !formData.address.trim()) {
      setCheckoutError("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setCheckoutError("Votre session a expiré. Veuillez vous reconnecter.");
      return;
    }

    try {
      if (paymentMethod === "card") {
        setIsProcessingCard(true);
        // Simulate Stripe API call delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsProcessingCard(false);
      }

      // Save order in backend database
      await API.post(
        "/orders",
        {
          items: cartItems.map(item => ({
            id: item.id.toString(),
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
            category: item.category,
            type: item.type,
            color: item.color || "Standard"
          })),
          totalPrice: finalTotal,
          fullName: formData.fullName,
          phone: formData.phone,
          city: formData.city,
          address: formData.address,
          note: formData.note,
          paymentMethod: paymentMethod === "card" ? "Carte Bancaire" : "Paiement à la livraison"
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Format WhatsApp message
      const message = `Bonjour AA Motors,

Je souhaite confirmer ma commande avec les détails suivants :

👤 *Détails du client :*
• Nom Complet : ${formData.fullName}
• Téléphone : ${formData.phone}
• Ville : ${formData.city}
• Adresse : ${formData.address}
${formData.note.trim() ? `• Note : ${formData.note}\n` : ""}
🛒 *Détails de la commande :*
${cartItems.map(item => `• ${item.name} (${item.quantity}x) ${item.color ? `[Couleur : ${item.color}]` : ""} - ${item.price}`).join("\n")}

💵 *Total :* ${finalTotal.toLocaleString()} DHS
Mode de paiement : ${paymentMethod === "card" ? "Carte Bancaire (Payé en ligne)" : "Paiement à la livraison"}

Merci de me confirmer la réception de ma commande.`;

      const whatsappLink = `https://wa.me/212774593031?text=${encodeURIComponent(message)}`;

      // Clear cart and show success
      localStorage.removeItem("pfa_cart");
      setCartItems([]);
      setIsCheckoutOpen(false);
      setIsSuccess(true);

      // Open WhatsApp
      window.open(whatsappLink, "_blank");
    } catch (err) {
      setIsProcessingCard(false);
      setCheckoutError(
        err.response?.data?.message || "Impossible d'enregistrer votre commande. Réessayez ou contactez-nous sur WhatsApp."
      );
    }
  };

  return (
    <div className="cart-page">
      <div className="cart-top-red-bar"></div>
      
      <div className="cart-container">
        <h1 className="cart-title">VOTRE PANIER</h1>

        {isSuccess ? (
          <div className="success-checkout-section">
            <div className="success-icon">🎉</div>
            <h2>Commande Enregistrée !</h2>
            <p>Votre commande a été traitée avec succès. Nous vous avons redirigé vers WhatsApp pour finaliser les détails de livraison avec notre équipe.</p>
            <p className="success-subtext">Si la fenêtre ne s'est pas ouverte automatiquement, veuillez utiliser le bouton WhatsApp ci-dessous.</p>
            <div className="success-actions">
              <a 
                href={`https://wa.me/212774593031`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-whatsapp-resend"
              >
                💬 Ouvrir WhatsApp
              </a>
              <Link to="/motos" className="btn-return">RETOUR À LA BOUTIQUE</Link>
            </div>
          </div>
        ) : cartItems.length === 0 ? (
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
                <span>{subtotal.toLocaleString()} DHS</span>
              </div>
              
              {discountPercent > 0 && (
                <div className="summary-row promo-applied-row">
                  <span>Remise {discountPercent}% ({localStorage.getItem("promo_code") || "Promo"})</span>
                  <span style={{ color: "#10b981" }}>-{discountAmount.toLocaleString()} DHS</span>
                </div>
              )}

              {/* Promo Code Input Form */}
              <form className="cart-promo-form" onSubmit={handleApplyPromo}>
                <input
                  type="text"
                  placeholder="Code promo (ex: AA3PROMO)"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="cart-promo-input"
                />
                <button type="submit" className="cart-promo-btn">Appliquer</button>
              </form>
              {promoMessage && (
                <p className={`promo-status-msg ${discountPercent > 0 ? "success" : "error"}`}>
                  {promoMessage}
                </p>
              )}

              <div className="summary-row total">
                <span>TOTAL</span>
                <span>{finalTotal.toLocaleString()} DHS</span>
              </div>
              <button className="checkout-btn" onClick={handleCheckoutClick}>COMMANDER</button>
              <Link to="/motos" className="continue-link">Continuer les achats</Link>
            </div>
          </div>
        )}
      </div>

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div className="checkout-modal-overlay">
          <div className="checkout-modal">
            <button className="checkout-close-btn" onClick={() => setIsCheckoutOpen(false)}>×</button>
            <h2>Finaliser votre commande</h2>
            <p className="checkout-subtitle">Remplissez les informations ci-dessous pour confirmer votre achat.</p>
            
            <form onSubmit={handleCheckoutSubmit} className="checkout-form">
              <div className="form-group">
                <label>Nom complet *</label>
                <input 
                  type="text" 
                  name="fullName" 
                  value={formData.fullName} 
                  onChange={handleInputChange} 
                  placeholder="Ex: Ahmed Alaoui" 
                  required 
                />
              </div>

              <div className="form-group">
                <label>Numéro de téléphone *</label>
                <input 
                  type="tel" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleInputChange} 
                  placeholder="Ex: 0612345678" 
                  required 
                />
              </div>

              <div className="form-group">
                <label>Ville *</label>
                <input 
                  type="text" 
                  name="city" 
                  value={formData.city} 
                  onChange={handleInputChange} 
                  placeholder="Ex: Casablanca" 
                  required 
                />
              </div>

              <div className="form-group">
                <label>Adresse de livraison *</label>
                <textarea 
                  name="address" 
                  value={formData.address} 
                  onChange={handleInputChange} 
                  placeholder="Ex: 12 Rue des Jardins, Appt 4" 
                  rows="3" 
                  required 
                />
              </div>

              <div className="form-group">
                <label>Note de commande (optionnel)</label>
                <textarea 
                  name="note" 
                  value={formData.note} 
                  onChange={handleInputChange} 
                  placeholder="Instructions de livraison, étage, etc." 
                  rows="2" 
                />
              </div>

              <div className="checkout-payment-info">
                <label style={{ fontSize: "13px", fontWeight: "700", color: "#aaa", textTransform: "uppercase", marginBottom: "10px", display: "block" }}>Mode de paiement *</label>
                
                <div className="payment-options">
                  <div className={`payment-option ${paymentMethod === "cod" ? "active" : ""}`} onClick={() => setPaymentMethod("cod")}>
                    <div className="payment-radio">
                      {paymentMethod === "cod" && <div className="payment-radio-dot"></div>}
                    </div>
                    <div className="payment-text">
                      <span className="payment-title">💵 Paiement à la livraison</span>
                      <span className="payment-desc">Payez en espèces lors de la réception.</span>
                    </div>
                  </div>
                  
                  <div className={`payment-option ${paymentMethod === "card" ? "active" : ""}`} onClick={() => setPaymentMethod("card")}>
                    <div className="payment-radio">
                      {paymentMethod === "card" && <div className="payment-radio-dot"></div>}
                    </div>
                    <div className="payment-text">
                      <span className="payment-title">💳 Carte Bancaire</span>
                      <span className="payment-desc">Paiement sécurisé via notre partenaire.</span>
                    </div>
                  </div>
                </div>

                {paymentMethod === "card" && (
                  <div className="stripe-mock-container">
                    <div className="stripe-mock-header">
                      <span>Détails de la carte</span>
                      <div className="card-icons">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/200px-Mastercard-logo.svg.png" alt="MC" className="card-icon" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.png" alt="Visa" className="card-icon" />
                      </div>
                    </div>
                    <div className="stripe-input-group">
                      <input type="text" placeholder="Numéro de carte" className="stripe-input full-width" maxLength="19" />
                      <div className="stripe-row">
                        <input type="text" placeholder="MM / AA" className="stripe-input half-width" maxLength="5" />
                        <input type="text" placeholder="CVC" className="stripe-input half-width" maxLength="3" />
                      </div>
                    </div>
                    <p className="stripe-secure-msg">🔒 Les données sont chiffrées de bout en bout.</p>
                  </div>
                )}
              </div>

              {checkoutError && <p className="checkout-error-msg">{checkoutError}</p>}

              <button type="submit" className="checkout-submit-btn" disabled={isProcessingCard}>
                {isProcessingCard ? (
                  <span className="processing-text">
                    <svg className="spinner" viewBox="0 0 50 50"><circle cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle></svg>
                    TRAITEMENT...
                  </span>
                ) : (
                  paymentMethod === "card" ? "PAYER ET CONFIRMER →" : "CONFIRMER ET ENVOYER SUR WHATSAPP →"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;