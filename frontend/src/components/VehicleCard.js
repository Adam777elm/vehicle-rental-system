import React, { useState } from "react";
import { getAvailableColors } from "../utils/colorData";
import "./CSS/VehicleCard.css";

/**
 * VehicleCard — carte universelle avec sélecteur de couleur interactif.
 * Props:
 *   bike     — objet véhicule { id, name, category, description, price, image, ... }
 *   badge    — texte du badge (ex: "SÉRIE R", "NEW 2026") — optionnel
 *   onNav    — callback(bike, currentImage) appelé au clic ACHETER ou carte
 */
function VehicleCard({ bike, badge, onNav }) {
  const colors = getAvailableColors(bike);
  const [activeIdx, setActiveIdx] = useState(0);

  const currentColor = colors[activeIdx];
  const currentImage = (currentColor && currentColor.image) ? currentColor.image : bike.image;

  const handleNav = () => onNav({ ...bike, image: currentImage });

  return (
    <div className="vc-card" onClick={handleNav}>
      {/* ── Image box ── */}
      <div className="vc-image-box">
        {badge && <div className="vc-badge">{badge}</div>}
        <img
          src={currentImage}
          alt={`${bike.name} – ${currentColor ? currentColor.name : ""}`}
          className="vc-image"
        />
        <div className="vc-hover-overlay">
          <button
            className="vc-action-btn"
            onClick={(e) => { e.stopPropagation(); handleNav(); }}
          >
            PARAMÈTRES
          </button>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="vc-content">
        <p className="vc-brand">{bike.brand || "YAMAHA"}</p>
        <h3 className="vc-name">{bike.name}</h3>
        <p className="vc-desc">{bike.description}</p>

        {/* ── Sélecteur de couleur ── */}
        {colors.length > 0 && currentColor && (
          <div className="vc-color-selector" onClick={(e) => e.stopPropagation()}>
            <span className="vc-color-label">
              Couleur : <strong>{currentColor.name}</strong>
            </span>
            <div className="vc-swatches">
              {colors.map((c, i) => (
                <button
                  key={i}
                  className={`vc-swatch${activeIdx === i ? " vc-swatch--active" : ""}`}
                  style={{ background: c.value }}
                  title={c.name}
                  onClick={(e) => { e.stopPropagation(); setActiveIdx(i); }}
                  aria-label={`Couleur ${c.name}`}
                />
              ))}
            </div>
          </div>
        )}

        <div className="vc-footer">
          <span className="vc-price">{bike.price}</span>
          <button
            className="vc-buy-btn"
            onClick={(e) => { e.stopPropagation(); handleNav(); }}
          >
            ACHETER
          </button>
        </div>
      </div>
    </div>
  );
}

export default VehicleCard;
