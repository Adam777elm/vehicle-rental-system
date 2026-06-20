import React, { useState, useEffect } from "react";
import "./PromoModal.css";

function PromoModal() {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const alreadySubscribed = localStorage.getItem("promo_subscribed");
    if (alreadySubscribed) return;

    const timer = setTimeout(() => {
      setVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setVisible(false);
      setClosing(false);
    }, 350);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    localStorage.setItem("promo_email", email);
    localStorage.setItem("promo_subscribed", "true");
    localStorage.setItem("promo_discount", "3");
    localStorage.setItem("promo_code", "AA3PROMO");
    setSubmitted(true);

    // Auto close after 6 seconds
    setTimeout(() => {
      handleClose();
    }, 6000);
  };

  if (!visible) return null;

  return (
    <div className={`promo-overlay ${closing ? "closing" : ""}`} onClick={handleClose}>
      <div className="promo-modal" onClick={(e) => e.stopPropagation()}>
        {/* Red accent bar */}
        <div className="promo-accent-bar"></div>

        {/* Close button */}
        <button className="promo-close" onClick={handleClose} aria-label="Fermer">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="promo-content">
          {!submitted ? (
            <>
              <span className="promo-badge">Offre Limitée</span>
              <span className="promo-emoji">🎉</span>
              <h2 className="promo-title">
                OBTENEZ <span className="promo-discount-highlight">-3%</span>
              </h2>
              <p className="promo-subtitle">
                Inscrivez-vous à notre newsletter et recevez un code de réduction
                exclusif de 3% sur votre première commande chez AA Motors.
              </p>

              <form className="promo-form" onSubmit={handleSubmit}>
                <div className="promo-input-wrapper">
                  <input
                    type="email"
                    className="promo-input"
                    placeholder="Entrez votre adresse email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <div className="promo-input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                </div>
                <button type="submit" className="promo-submit" disabled={!email}>
                  OBTENIR MON CODE
                </button>
                <p className="promo-terms">
                  En vous inscrivant, vous acceptez de recevoir nos offres par email.
                </p>
              </form>
            </>
          ) : (
            <div className="promo-success">
              <div className="promo-check-circle">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="promo-success-title">Félicitations ! 🎊</h3>
              <p className="promo-success-text">
                Votre code de réduction a été activé avec succès.
                Utilisez-le lors de votre commande pour bénéficier de -3%.
              </p>
              <div className="promo-code-box">
                <span className="promo-code-label">Votre code promo</span>
                <span className="promo-code-value">AA3PROMO</span>
              </div>
              <p className="promo-code-hint">Ce code sera automatiquement appliqué à votre panier.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PromoModal;
