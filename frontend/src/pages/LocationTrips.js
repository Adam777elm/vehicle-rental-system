import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./CSS/Location.css";
import heroImg from "../assets/HOME_IMG/Loca3.jpg";
import API from "../services/api";
import { RENTAL_FLEET, RENTAL_CATEGORIES, formatPricePerDay, mergeWithDbVehicles } from "../data/rentalFleet";
import { getUploadUrl, resolveVehicleImage } from "../utils/imageUrl";

// Trip Images
import packImg from "../assets/TRIPS_IMG/pack-decouverte.png";
import coastImg from "../assets/TRIPS_IMG/trips-coast.png";
import desertImg from "../assets/TRIPS_IMG/trips-desert.png";
import tripsHeroImg from "../assets/TRIPS_IMG/trips-hero.png";

function LocationTrips() {
  const navigate = useNavigate();
  const [fleet, setFleet] = useState(RENTAL_FLEET);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [hoveredCard, setHoveredCard] = useState(null);

  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    destination: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [alertSubmitted, setAlertSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDevisSubmit = (e) => {
    e.preventDefault();
    console.log("Demande de devis:", formData);
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ nom: "", email: "", telephone: "", destination: "", message: "" });
    }, 4000);
  };

  const handleAlertSubmit = () => {
    setAlertSubmitted(true);
    setTimeout(() => setAlertSubmitted(false), 3000);
  };

  const handleRentSelect = (bikeKey) => {
    setFormData((prev) => ({ ...prev, destination: bikeKey }));
    document.getElementById("trips-contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const tripPackages = useMemo(() => [
    {
      id: 1,
      tag: "AVENTURE",
      title: "Route de l'Atlas",
      desc: "Traversée épique des cols de l'Atlas avec des paysages à couper le souffle. Routes sinueuses et panoramas grandioses.",
      image: tripsHeroImg,
      duration: "5 jours",
      price: "4 500",
    },
    {
      id: 2,
      tag: "CÔTE ATLANTIQUE",
      title: "Essaouira Ride",
      desc: "Longez la côte atlantique marocaine, d'Agadir à Essaouira. Falaises, plages sauvages et villages de pêcheurs.",
      image: coastImg,
      duration: "3 jours",
      price: "2 800",
    },
    {
      id: 3,
      tag: "DÉSERT",
      title: "Sahara Express",
      desc: "Aventure dans les dunes de Merzouga. Bivouac sous les étoiles et traversée de paysages lunaires inoubliables.",
      image: desertImg,
      duration: "4 jours",
      price: "5 200",
    },
  ], []);

  const secondaryImg = getUploadUrl("1776370846917-Loca-1.webp");

  useEffect(() => {
    API.get("/vehicles?type=rent")
      .then((res) => {
        setFleet(mergeWithDbVehicles(RENTAL_FLEET, res.data));
      })
      .catch(() => setFleet(RENTAL_FLEET))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("trips-reveal-visible");
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll(".trips-reveal");
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [loading]);

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

        {/* ===================== SEPARATOR ===================== */}
        <div className="trips-separator">
          <div className="separator-line"></div>
          <div className="separator-diamond"></div>
          <div className="separator-line"></div>
        </div>

        {/* ===================== TRIP PACKAGES GRID ===================== */}
        <section className="trips-packages-section">
          <div className="trips-section-header trips-reveal">
            <span className="trips-section-tag">NOS CIRCUITS</span>
            <h2 className="trips-section-title">Trips Organisés</h2>
            <p className="trips-section-subtitle">
              Des circuits pensés pour chaque type de rider. Du débutant au pilote
              confirmé, choisissez votre prochaine aventure marocaine.
            </p>
          </div>

          <div className="trips-packages-grid">
            {tripPackages.map((trip, index) => (
              <div
                key={trip.id}
                className="trip-package-card trips-reveal"
                style={{ transitionDelay: `${index * 0.15}s` }}
                onClick={() => handleRentSelect(trip.id === 1 ? "atlas" : trip.id === 2 ? "coast" : "desert")}
              >
                <div className="trip-package-image">
                  <img src={trip.image} alt={trip.title} />
                  <span className="trip-package-duration">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    {trip.duration}
                  </span>
                </div>
                <div className="trip-package-body">
                  <span className="trip-package-tag">{trip.tag}</span>
                  <h3 className="trip-package-title">{trip.title}</h3>
                  <p className="trip-package-desc">{trip.desc}</p>
                  <div className="trip-package-footer">
                    <div className="trip-package-price">
                      {trip.price} DHS <span>/ pers</span>
                    </div>
                    <button
                      className="trip-package-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRentSelect(trip.id === 1 ? "atlas" : trip.id === 2 ? "coast" : "desert");
                      }}
                    >
                      RÉSERVER
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===================== COMING SOON BANNER ===================== */}
        <section className="trips-coming-soon-section trips-reveal">
          <div className="trips-coming-soon-banner">
            <div className="trips-coming-soon-icon">🗺️</div>
            <div className="trips-coming-soon-content">
              <h3 className="trips-coming-soon-title">
                Trips organisés — Bientôt disponible
                <span className="trips-coming-soon-tag">COMING SOON</span>
              </h3>
              <p className="trips-coming-soon-desc">
                Sorties guidées Atlas, côte Atlantique et désert. Des aventures
                clé-en-main en préparation. Laissez votre contact pour être informé
                en premier.
              </p>
            </div>
            <button className="trips-coming-soon-btn" onClick={handleAlertSubmit}>
              {alertSubmitted ? "✓ INSCRIT !" : "M'ALERTER"}
            </button>
          </div>
        </section>

        {/* ===================== CONTACT / DEVIS FORM ===================== */}
        <section className="trips-contact-section" id="trips-contact">
          <div className="trips-contact-card trips-reveal">
            <div className="trips-contact-icon">✉️</div>
            <h2 className="trips-contact-title">Demander un Devis / S'inscrire</h2>
            <p className="trips-contact-desc">
              Laissez vos coordonnées et décrivez votre projet de trip ou location. Nous vous
              répondrons sous 24h avec un devis personnalisé.
            </p>

            {formSubmitted ? (
              <div className="trips-form-success">
                <span className="trips-form-success-icon">✅</span>
                <h3>Demande envoyée avec succès !</h3>
                <p>
                  Nous avons bien reçu votre demande. Notre équipe vous contactera
                  sous 24h.
                </p>
              </div>
            ) : (
              <form className="trips-contact-form" onSubmit={handleDevisSubmit}>
                <div className="trips-form-row">
                  <div className="trips-form-group">
                    <label htmlFor="trips-nom">Nom complet</label>
                    <input
                      id="trips-nom"
                      type="text"
                      name="nom"
                      placeholder="Votre nom"
                      value={formData.nom}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="trips-form-group">
                    <label htmlFor="trips-email">Email</label>
                    <input
                      id="trips-email"
                      type="email"
                      name="email"
                      placeholder="votre@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="trips-form-row">
                  <div className="trips-form-group">
                    <label htmlFor="trips-telephone">Téléphone</label>
                    <input
                      id="trips-telephone"
                      type="tel"
                      name="telephone"
                      placeholder="+212 6XX XXX XXX"
                      value={formData.telephone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="trips-form-group">
                    <label htmlFor="trips-destination">Véhicule / Destination</label>
                    <select
                      id="trips-destination"
                      name="destination"
                      value={formData.destination}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Choisir une option</option>
                      <optgroup label="Trips Organisés (Circuits)">
                        <option value="atlas">Route de l'Atlas (Guided)</option>
                        <option value="coast">Essaouira Ride (Guided)</option>
                        <option value="desert">Sahara Express (Guided)</option>
                        <option value="custom">Sur mesure / Autre</option>
                      </optgroup>
                    </select>
                  </div>
                </div>

                <div className="trips-form-group">
                  <label htmlFor="trips-message">Message</label>
                  <textarea
                    id="trips-message"
                    name="message"
                    placeholder="Décrivez votre projet (nombre de personnes, dates souhaitées, niveau d'expérience...)"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                  />
                </div>

                <div className="trips-form-submit">
                  <button type="submit" className="trips-btn-primary">
                    DEMANDER UN DEVIS
                  </button>
                  <button
                    type="button"
                    className="trips-btn-secondary"
                    onClick={handleAlertSubmit}
                  >
                    {alertSubmitted ? "✓ INSCRIT !" : "M'ALERTER"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>
      </section>
    </div>
  );
}

export default LocationTrips;
