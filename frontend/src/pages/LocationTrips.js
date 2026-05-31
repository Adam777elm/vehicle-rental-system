import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./CSS/Location.css";
import heroImg from "../assets/HOME_IMG/Loca3.jpg";
import API from "../services/api";
import { RENTAL_FLEET, RENTAL_CATEGORIES, formatPricePerDay, mergeWithDbVehicles } from "../data/rentalFleet";
import { getUploadUrl, resolveVehicleImage } from "../utils/imageUrl";

function LocationTrips() {
  const navigate = useNavigate();
  const [fleet, setFleet] = useState(RENTAL_FLEET);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [hoveredCard, setHoveredCard] = useState(null);

  const secondaryImg = getUploadUrl("1776370846917-Loca-1.webp");

  useEffect(() => {
    API.get("/vehicles?type=rent")
      .then((res) => {
        setFleet(mergeWithDbVehicles(RENTAL_FLEET, res.data));
      })
      .catch(() => setFleet(RENTAL_FLEET))
      .finally(() => setLoading(false));
  }, []);

  const filteredFleet = useMemo(() => {
    if (activeCategory === "Tous") return fleet;
    return fleet.filter((b) => b.category === activeCategory);
  }, [fleet, activeCategory]);

  const goToRental = (bike, e) => {
    e?.stopPropagation();
    navigate(`/location/${bike.mongoId || bike.id}`, { state: { bike } });
  };

  const BADGE_COLORS = {
    "POPULAIRE": { bg: "rgba(251,191,36,0.15)", color: "#fbbf24", border: "rgba(251,191,36,0.4)" },
    "SPORT":     { bg: "rgba(239,68,68,0.15)",  color: "#ef4444", border: "rgba(239,68,68,0.4)" },
    "NOUVEAU":   { bg: "rgba(34,197,94,0.15)",  color: "#22c55e", border: "rgba(34,197,94,0.4)" },
    "COUP DE CŒUR": { bg: "rgba(168,85,247,0.15)", color: "#a855f7", border: "rgba(168,85,247,0.4)" },
    "AVENTURE":  { bg: "rgba(249,115,22,0.15)", color: "#f97316", border: "rgba(249,115,22,0.4)" },
    "PREMIUM":   { bg: "rgba(59,130,246,0.15)", color: "#3b82f6", border: "rgba(59,130,246,0.4)" },
  };

  const renderCard = (bike) => {
    const imgSrc = resolveVehicleImage(bike.image);
    const unavailable = bike.availability === false;
    const badgeStyle = bike.badge ? BADGE_COLORS[bike.badge] || BADGE_COLORS["POPULAIRE"] : null;
    const isHovered = hoveredCard === bike.id;

    return (
      <div
        key={bike.id}
        className={`loc-bike-card ${isHovered ? "hovered" : ""} ${unavailable ? "unavailable" : ""}`}
        onClick={(e) => !unavailable && goToRental(bike, e)}
        onMouseEnter={() => setHoveredCard(bike.id)}
        onMouseLeave={() => setHoveredCard(null)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && !unavailable && goToRental(bike, e)}
      >
        {/* Image zone */}
        <div className="loc-card-image-box">
          <div className="loc-card-img-bg" />
          <img src={imgSrc} alt={bike.name} className="loc-bike-image" />
          {unavailable && <div className="loc-unavailable-overlay">INDISPONIBLE</div>}
          {badgeStyle && (
            <span
              className="loc-badge"
              style={{ background: badgeStyle.bg, color: badgeStyle.color, borderColor: badgeStyle.border }}
            >
              {bike.badge}
            </span>
          )}
          <div className="loc-card-hover-cta">Voir les détails →</div>
        </div>

        {/* Content */}
        <div className="loc-card-content">
          <div className="loc-card-top">
            <p className="loc-bike-category">{bike.category}</p>
            <h3 className="loc-bike-name">{bike.name}</h3>
            <p className="loc-bike-desc">{bike.description}</p>
          </div>

          {bike.features?.length > 0 && (
            <div className="loc-card-features">
              {bike.features.slice(0, 3).map((f, i) => (
                <span key={i} className="loc-feature-tag">{f}</span>
              ))}
            </div>
          )}

          <div className="loc-card-footer">
            <div className="loc-price-block">
              <span className="loc-price-from">à partir de</span>
              <span className="loc-bike-price">{formatPricePerDay(bike.pricePerDay)}</span>
            </div>
            <button
              className={`loc-reserve-btn ${unavailable ? "disabled" : ""}`}
              onClick={(e) => goToRental(bike, e)}
              disabled={unavailable}
            >
              {unavailable ? "Indisponible" : "Réserver"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="loc-page">
      <div className="loc-red-bar" />

      {/* ─── HERO ─── */}
      <section className="loc-hero-banner">
        <img src={heroImg} alt="Location motos AA Motors" className="loc-banner-img" />
        <div className="loc-banner-gradient" />
        <div className="loc-banner-overlay">
          <span className="loc-hero-eyebrow">
            <span className="loc-eyebrow-dot" />
            LOCATION & TRIPS — AA MOTORS
            <span className="loc-eyebrow-dot" />
          </span>
          <h1 className="loc-banner-title">
            Vivez la <span className="loc-title-accent">liberté</span><br />sur deux roues
          </h1>
          <p className="loc-hero-desc">
            Louez une moto ou un scooter Yamaha pour quelques heures, une journée ou toute la durée de
            votre séjour. Assurance, assistance 24/7 et flexibilité incluses.
          </p>
          <div className="loc-hero-actions">
            <a href="#flotte" className="loc-btn-primary">
              <span>DÉCOUVRIR LA FLOTTE</span>
              <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
            <Link to="/my-reservations" className="loc-btn-outline">MES RÉSERVATIONS</Link>
          </div>
        </div>

        {/* Hero stats */}
        <div className="loc-hero-stats">
          <div className="loc-hero-stat"><span className="loc-stat-num">12</span><span className="loc-stat-label">Modèles</span></div>
          <div className="loc-hero-stat-sep" />
          <div className="loc-hero-stat"><span className="loc-stat-num">24/7</span><span className="loc-stat-label">Assistance</span></div>
          <div className="loc-hero-stat-sep" />
          <div className="loc-hero-stat"><span className="loc-stat-num">200 km</span><span className="loc-stat-label">Inclus/jour</span></div>
          <div className="loc-hero-stat-sep" />
          <div className="loc-hero-stat"><span className="loc-stat-num">48h</span><span className="loc-stat-label">Annulation gratuite</span></div>
        </div>
      </section>

      {/* ─── INFO STRIP ─── */}
      <div className="loc-info-strip">
        <div className="loc-info-item">
          <div className="loc-info-icon">🛡️</div>
          <div>
            <strong>Assurance incluse</strong>
            <span>Tous risques sur chaque location</span>
          </div>
        </div>
        <div className="loc-info-item">
          <div className="loc-info-icon">🗺️</div>
          <div>
            <strong>Itinéraires offerts</strong>
            <span>Carte des meilleurs routes</span>
          </div>
        </div>
        <div className="loc-info-item">
          <div className="loc-info-icon">⚡</div>
          <div>
            <strong>Réservation instantanée</strong>
            <span>Confirmée en quelques secondes</span>
          </div>
        </div>
        <div className="loc-info-item">
          <div className="loc-info-icon">🏍️</div>
          <div>
            <strong>Entretien garanti</strong>
            <span>Motos révisées avant chaque location</span>
          </div>
        </div>
      </div>

      {/* ─── FLEET ─── */}
      <section className="loc-content-section" id="flotte">
        <div className="loc-section-header">
          <span className="loc-section-eyebrow">NOTRE SÉLECTION</span>
          <h2 className="loc-section-title">FLOTTE LOCATION</h2>
          <div className="loc-separator">
            <div className="loc-separator-line" />
            <div className="loc-separator-diamond" />
            <div className="loc-separator-line" />
          </div>
          <p className="loc-section-desc">
            Choisissez votre machine, sélectionnez vos dates et confirmez en ligne.
            Connexion requise pour finaliser la réservation.
          </p>
        </div>

        {/* Category filters */}
        <div className="loc-filters">
          {RENTAL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`loc-filter-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
              {cat !== "Tous" && (
                <span className="loc-filter-count">
                  {fleet.filter((b) => b.category === cat).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loc-loading-wrapper">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="loc-skeleton-card">
                <div className="loc-skeleton-img" />
                <div className="loc-skeleton-content">
                  <div className="loc-skeleton-line short" />
                  <div className="loc-skeleton-line" />
                  <div className="loc-skeleton-line medium" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredFleet.length === 0 ? (
          <div className="loc-empty-state">
            <span className="loc-empty-icon">🏍️</span>
            <p>Aucun véhicule disponible dans cette catégorie pour le moment.</p>
            <button className="loc-btn-primary" onClick={() => setActiveCategory("Tous")}>
              Voir tous les véhicules
            </button>
          </div>
        ) : (
          <div className="loc-bikes-grid">{filteredFleet.map(renderCard)}</div>
        )}

        {/* Pack banner */}
        <div className="loc-secondary-banner">
          <img
            src={secondaryImg}
            alt="Pack découverte AA Motors"
            className="loc-secondary-img"
            onError={(e) => { e.target.style.display = "none"; }}
          />
          <div className="loc-secondary-overlay" />
          <div className="loc-secondary-text">
            <span className="loc-secondary-eyebrow">OFFRE EXCLUSIVE</span>
            <h3>Pack Découverte Marocain</h3>
            <p>
              Casque, gants, carte des meilleurs itinéraires et assistance GPS inclus.
              Contactez-nous pour un devis personnalisé et des tarifs groupes.
            </p>
            <a
              href="https://wa.me/212774593031"
              className="loc-btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>DEMANDER UN DEVIS</span>
            </a>
          </div>
        </div>

        {/* Trips teaser */}
        <div className="loc-trips-teaser">
          <div className="loc-trips-icon">🗺️</div>
          <div className="loc-trips-text">
            <h3>Trips organisés — Bientôt disponible</h3>
            <p>
              Sorties guidées Atlas, côte Atlantique et désert. Des aventures clé-en-main en préparation.
              Laissez votre contact pour être informé en premier.
            </p>
          </div>
          <a
            href="https://wa.me/212774593031"
            className="loc-btn-outline"
            target="_blank"
            rel="noopener noreferrer"
          >
            M'ALERTER
          </a>
        </div>
      </section>
    </div>
  );
}

export default LocationTrips;
