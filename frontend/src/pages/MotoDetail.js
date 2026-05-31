import React, { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import "./CSS/MotoDetail.css";


function MotoDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get bike data passed from the Link's state
  const bike = location.state?.bike;
  const categoryStr = bike?.category || "Motos";
  
  const [quantity, setQuantity] = useState(1);

  // If no bike data, show error or redirect
  if (!bike) {
    return (
      <div className="moto-detail-error">
        <h2>Moto introuvable</h2>
        <button onClick={() => navigate("/motos")}>Retour aux motos</button>
      </div>
    );
  }

  // Simulate old price for display effect (from the screenshot)
  const numericPrice = parseInt(bike.price.replace(/\D/g, ''), 10);
  const oldPrice = numericPrice ? (numericPrice * 1.08).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " DHS" : null;
  const currentPrice = bike.price.replace('DH', 'DHS');

  const incrementQty = () => setQuantity((prev) => prev + 1);
  const decrementQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const addToCart = () => {
    const cartItem = {
      id: bike.id,
      name: bike.name,
      price: currentPrice,
      quantity: quantity,
      image: bike.image,
      category: categoryStr,
      type: bike.type
    };

    // Récupère l'ancien panier ou initialise
    const existingCart = JSON.parse(localStorage.getItem("pfa_cart") || "[]");
    
    // Vérifie si la moto est déjà là
    const existingItemIndex = existingCart.findIndex(item => item.id === bike.id);
    if (existingItemIndex >= 0) {
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      existingCart.push(cartItem);
    }
    
    localStorage.setItem("pfa_cart", JSON.stringify(existingCart));
    navigate("/cart"); // Redirige vers le panier
  };

  return (
    <div className="moto-detail-wrapper">
      {/* Breadcrumb Navigation */}
      <div className="breadcrumb">
        <Link to="/">Accueil</Link> &gt; 
        <Link to="/motos"> Boutique</Link> &gt; 
        <Link to="/motos"> Motos</Link> &gt; 
        <span className="current-crumb"> {bike.name}</span>
      </div>

      <div className="moto-detail-container">
        
        {/* LEFT COLUMN: 1 IMAGE ONLY WITH ZOOM */}
        <div className="moto-detail-left">
          
          <div 
            className="main-image-container zoom-container"
            onMouseMove={(e) => {
              const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
              const x = ((e.pageX - left - window.scrollX) / width) * 100;
              const y = ((e.pageY - top - window.scrollY) / height) * 100;
              e.currentTarget.querySelector('.zoom-image').style.transformOrigin = `${x}% ${y}%`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.querySelector('.zoom-image').style.transformOrigin = 'center center';
            }}
          >
            <img src={bike.image} alt={bike.name} className="main-bike-image zoom-image" />
          </div>

        </div>

        {/* RIGHT COLUMN: DETAILS */}
        <div className="moto-detail-right">
          <div className="brand-logo-container">
            <h2 className="brand-text">YAMAHA</h2>
            <p className="brand-slogan">Revs Your Heart</p>
          </div>

          <h1 className="moto-title">{bike.name}</h1>

          <div className="price-section">
            <span className="price-label">À partir de </span>
            {oldPrice && <span className="old-price">{oldPrice}</span>}
            <span className="new-price">{currentPrice}</span>
          </div>

          <h3 className="slogan-title">L'ULTIME EXPÉRIENCE</h3>
          
          <div className="description-text">
            <p>{bike.description}</p>
            <p>Caché profondément dans le châssis, retrouvez l'ensemble le plus sophistiqué d'aides électroniques à la conduite conçu pour t'offrir le plus haut niveau de contrôle. Grâce à des systèmes de haute technologie, tu peux faire en sorte que ta {bike.name} se comporte exactement comme tu le souhaites.</p>
          </div>

          <div className="purchase-actions">
            <div className="quantity-selector">
              <button className="qty-btn" onClick={decrementQty}>-</button>
              <input type="text" value={quantity} readOnly className="qty-input" />
              <button className="qty-btn" onClick={incrementQty}>+</button>
            </div>
            
            <button className="add-to-cart-btn" onClick={addToCart}>
              {bike.type === 'location' ? 'Réserver la Date' : 'Ajouter Au Panier'}
            </button>
          </div>

          <div className="categories-info">
            <span className="cat-label">Catégories : </span>
            <span className="cat-value">{categoryStr}, Motos</span>
          </div>
        </div>

      </div>

      {/* ═══ APERÇU RAPIDE BANDEAU ═══ */}
      {bike.features && bike.features.length > 0 && (
        <div className="apercue-rapide">
          <h2 className="apercue-title">Aperçu rapide</h2>
          <ul className="apercue-list">
            {bike.features.map((feature, i) => (
              <li key={i} className="apercue-item">
                <span className="apercue-bullet">•</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MotoDetail;
