import React, { useState, useMemo, useEffect } from "react";
import { useLocation, Link, useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import { RENTAL_FLEET, formatPricePerDay } from "../data/rentalFleet";
import { resolveVehicleImage } from "../utils/imageUrl";
import "./CSS/RentalDetail.css";

function RentalDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [bike, setBike] = useState(location.state?.bike || null);
  const [loading, setLoading] = useState(!location.state?.bike);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (location.state?.bike) {
      setBike(location.state.bike);
      setLoading(false);
      return;
    }

    const fromCatalog = RENTAL_FLEET.find((b) => b.id === id);
    if (fromCatalog) {
      API.get("/vehicles?type=rent")
        .then((res) => {
          const match = res.data.find(
            (d) =>
              d.name.toLowerCase().includes(fromCatalog.name.toLowerCase()) ||
              fromCatalog.name.toLowerCase().includes(d.name.toLowerCase())
          );
          setBike(
            match
              ? {
                  ...fromCatalog,
                  mongoId: match._id,
                  pricePerDay: match.price ?? fromCatalog.pricePerDay,
                  image: match.image || fromCatalog.image,
                }
              : fromCatalog
          );
        })
        .catch(() => setBike(fromCatalog))
        .finally(() => setLoading(false));
      return;
    }

    if (id && id.length === 24) {
      API.get(`/vehicles/${id}`)
        .then((res) => {
          const v = res.data;
          setBike({
            id: v._id,
            mongoId: v._id,
            name: v.name,
            category: v.category,
            description: v.description || "",
            pricePerDay: v.price,
            image: v.image,
            features: [],
            availability: v.availability !== false,
          });
        })
        .catch(() => setBike(null))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [id, location.state?.bike]);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const today = new Date().toISOString().split("T")[0];

  const days = useMemo(() => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (end <= start) return 0;
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  }, [startDate, endDate]);

  const totalPrice = days > 0 ? days * (bike?.pricePerDay || 0) : 0;

  if (loading) {
    return (
      <div className="rd-page">
        <div className="rd-loading">
          <div className="rd-loading-spinner" />
          <p>Chargement du véhicule…</p>
        </div>
      </div>
    );
  }

  if (!bike) {
    return (
      <div className="rd-page">
        <div className="rd-not-found">
          <span className="rd-not-found-icon">🏍️</span>
          <h2>Véhicule introuvable</h2>
          <p>Ce modèle n'est plus disponible dans notre catalogue.</p>
          <button type="button" className="rd-btn-primary" onClick={() => navigate("/location-trips")}>
            ← Retour à la location
          </button>
        </div>
      </div>
    );
  }

  const imgSrc = resolveVehicleImage(bike.image);
  const vehicleId = bike.mongoId || (id && id.length === 24 ? id : null);
  const unavailable = bike.availability === false;

  const handleReserve = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage({
        type: "error",
        text: "Connectez-vous pour réserver. Redirection dans 2 secondes…",
      });
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    if (!startDate || !endDate) {
      setMessage({ type: "error", text: "Veuillez choisir les dates de début et de fin." });
      return;
    }

    if (days < 1) {
      setMessage({
        type: "error",
        text: "La date de fin doit être postérieure à la date de début.",
      });
      return;
    }

    if (!vehicleId) {
      setMessage({
        type: "error",
        text: "Réservation en ligne indisponible pour ce modèle. Contactez-nous sur WhatsApp.",
      });
      return;
    }

    setSubmitting(true);
    try {
      await API.post(
        "/reservations",
        { vehicle: vehicleId, startDate, endDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage({
        type: "success",
        text: "🎉 Réservation enregistrée avec succès ! Redirection…",
      });
      setTimeout(() => navigate("/my-reservations"), 2200);
    } catch (err) {
      setMessage({
        type: "error",
        text:
          err.response?.data?.message ||
          "Impossible de créer la réservation. Réessayez ou contactez-nous sur WhatsApp.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rd-page">
      {/* Background decoration */}
      <div className="rd-bg-glow" />

      {/* Breadcrumb */}
      <div className="rd-breadcrumb">
        <Link to="/">Accueil</Link>
        <span className="rd-crumb-sep">›</span>
        <Link to="/location-trips">Location</Link>
        <span className="rd-crumb-sep">›</span>
        <span>{bike.name}</span>
      </div>

      <div className="rd-container">
        {/* ─── LEFT: Image + Specs ─── */}
        <div className="rd-left">
          {/* Image card */}
          <div className="rd-image-card">
            <div className="rd-image-bg" />
            {!imgError ? (
              <img
                src={imgSrc}
                alt={bike.name}
                className="rd-bike-image"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="rd-image-placeholder">🏍️</div>
            )}
            <div className="rd-image-badge">LOCATION</div>
            {bike.badge && (
              <div className="rd-image-badge-extra">{bike.badge}</div>
            )}
          </div>

          {/* Features */}
          {bike.features?.length > 0 && (
            <div className="rd-specs-card">
              <h3 className="rd-specs-title">
                <span className="rd-specs-icon">⚙️</span>
                Équipements inclus
              </h3>
              <div className="rd-specs-grid">
                {bike.features.map((f, i) => (
                  <div key={i} className="rd-spec-item">
                    <span className="rd-spec-dot" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Included services */}
          <div className="rd-services-card">
            <h3 className="rd-specs-title">
              <span className="rd-specs-icon">✅</span>
              Inclus dans la location
            </h3>
            <div className="rd-services-list">
              <div className="rd-service-item"><span>🛡️</span> Assurance tous risques</div>
              <div className="rd-service-item"><span>📞</span> Assistance 24h/24</div>
              <div className="rd-service-item"><span>🗺️</span> Carte itinéraires offerte</div>
              <div className="rd-service-item"><span>⛽</span> Plein à la livraison</div>
              <div className="rd-service-item"><span>🏁</span> 200 km inclus par jour</div>
            </div>
          </div>
        </div>

        {/* ─── RIGHT: Info + Form ─── */}
        <div className="rd-right">
          <div className="rd-header">
            <div className="rd-header-top">
              <span className="rd-badge-loc">LOCATION</span>
              <span className="rd-badge-cat">{bike.category}</span>
            </div>
            <h1 className="rd-title">{bike.name}</h1>
            <p className="rd-desc">{bike.description}</p>
          </div>

          {/* Price block */}
          <div className="rd-price-block">
            <div className="rd-price-left">
              <span className="rd-price-label">Tarif journalier</span>
              <span className="rd-price-value">{formatPricePerDay(bike.pricePerDay)}</span>
            </div>
            <div className="rd-price-right">
              <div className="rd-price-info-item">
                <span className="rd-price-info-val">200 km</span>
                <span className="rd-price-info-lbl">inclus/jour</span>
              </div>
              <div className="rd-price-info-sep" />
              <div className="rd-price-info-item">
                <span className="rd-price-info-val">48h</span>
                <span className="rd-price-info-lbl">annulation</span>
              </div>
            </div>
          </div>

          {/* Booking form */}
          <form className="rd-form" onSubmit={handleReserve}>
            <h3 className="rd-form-title">Choisissez vos dates</h3>

            <div className="rd-dates-grid">
              <div className="rd-date-field">
                <label htmlFor="startDate">
                  <span className="rd-label-icon">📅</span> Début de location
                </label>
                <input
                  id="startDate"
                  type="date"
                  min={today}
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                    if (endDate && e.target.value >= endDate) setEndDate("");
                  }}
                  required
                />
              </div>
              <div className="rd-date-field">
                <label htmlFor="endDate">
                  <span className="rd-label-icon">🏁</span> Fin de location
                </label>
                <input
                  id="endDate"
                  type="date"
                  min={startDate || today}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Summary */}
            {days > 0 && (
              <div className="rd-summary">
                <div className="rd-summary-row">
                  <span>{bike.pricePerDay.toLocaleString("fr-FR")} DHS × {days} jour{days > 1 ? "s" : ""}</span>
                  <span>{totalPrice.toLocaleString("fr-FR")} DHS</span>
                </div>
                <div className="rd-summary-row included">
                  <span>Assurance & assistance</span>
                  <span className="rd-free-tag">INCLUS</span>
                </div>
                <div className="rd-summary-total">
                  <span>Total</span>
                  <span className="rd-total-price">{totalPrice.toLocaleString("fr-FR")} DHS</span>
                </div>
              </div>
            )}

            <button
              type="submit"
              className={`rd-submit-btn ${submitting ? "loading" : ""}`}
              disabled={submitting || unavailable}
            >
              {submitting ? (
                <>
                  <span className="rd-submit-spinner" />
                  <span>EN COURS…</span>
                </>
              ) : unavailable ? (
                "VÉHICULE INDISPONIBLE"
              ) : (
                "CONFIRMER LA RÉSERVATION →"
              )}
            </button>

            {message.text && (
              <div className={`rd-message ${message.type}`}>
                {message.text}
              </div>
            )}

            {!localStorage.getItem("token") && (
              <p className="rd-login-hint">
                Vous devez être <Link to="/login">connecté</Link> pour réserver.
              </p>
            )}
          </form>

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/212774593031"
            className="rd-whatsapp-cta"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="rd-wa-icon">💬</span>
            <div>
              <strong>Besoin d'aide ou prix groupe ?</strong>
              <span>Contactez-nous sur WhatsApp</span>
            </div>
            <span className="rd-wa-arrow">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default RentalDetail;
