import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import "./CSS/MyReservations.css";

const STATUS_CONFIG = {
  pending:   { label: "En attente", color: "#f59e0b", bg: "rgba(245,158,11,0.1)",  border: "rgba(245,158,11,0.25)",  icon: "⏳" },
  confirmed: { label: "Confirmée",  color: "#22c55e", bg: "rgba(34,197,94,0.1)",   border: "rgba(34,197,94,0.25)",   icon: "✅" },
  cancelled: { label: "Annulée",    color: "#ef4444", bg: "rgba(239,68,68,0.1)",   border: "rgba(239,68,68,0.25)",   icon: "❌" },
};

function MyReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);

  const fetchReservations = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const res = await API.get("/reservations/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReservations(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleCancel = async (reservationId) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    if (!window.confirm("Êtes-vous sûr de vouloir annuler cette réservation ?")) return;

    setCancellingId(reservationId);
    try {
      await API.put(`/reservations/${reservationId}/cancel`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchReservations();
    } catch (err) {
      alert(err.response?.data?.message || "Erreur lors de l'annulation.");
    } finally {
      setCancellingId(null);
    }
  };

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });

  const calcDays = (start, end) => {
    const diff = new Date(end) - new Date(start);
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <div className="myres-page">
        <div className="myres-auth-gate">
          <div className="myres-auth-icon">🔐</div>
          <h2>Connexion requise</h2>
          <p>Accédez à vos réservations en vous connectant à votre compte AA Motors.</p>
          <Link to="/login" className="myres-btn-primary">SE CONNECTER</Link>
          <p className="myres-auth-hint">
            Pas encore de compte ? <Link to="/login">Créer un compte</Link>
          </p>
        </div>
      </div>
    );
  }

  const activeReservations = reservations.filter((r) => r.status !== "cancelled");
  const cancelledReservations = reservations.filter((r) => r.status === "cancelled");

  return (
    <div className="myres-page">
      {/* Header */}
      <div className="myres-header">
        <div className="myres-header-content">
          <span className="myres-header-eyebrow">MON ESPACE</span>
          <h1 className="myres-header-title">Mes Réservations</h1>
          <p className="myres-header-sub">Suivez et gérez toutes vos locations chez AA Motors</p>
        </div>
        <Link to="/location-trips" className="myres-new-btn">
          <span>+</span> Nouvelle réservation
        </Link>
      </div>

      {/* Stats row */}
      {reservations.length > 0 && (
        <div className="myres-stats">
          <div className="myres-stat">
            <span className="myres-stat-num">{reservations.length}</span>
            <span className="myres-stat-lbl">Total</span>
          </div>
          <div className="myres-stat">
            <span className="myres-stat-num" style={{ color: "#f59e0b" }}>
              {reservations.filter((r) => r.status === "pending").length}
            </span>
            <span className="myres-stat-lbl">En attente</span>
          </div>
          <div className="myres-stat">
            <span className="myres-stat-num" style={{ color: "#22c55e" }}>
              {reservations.filter((r) => r.status === "confirmed").length}
            </span>
            <span className="myres-stat-lbl">Confirmées</span>
          </div>
          <div className="myres-stat">
            <span className="myres-stat-num" style={{ color: "#ef4444" }}>
              {cancelledReservations.length}
            </span>
            <span className="myres-stat-lbl">Annulées</span>
          </div>
        </div>
      )}

      {/* Content */}
      {loading ? (
        <div className="myres-loading">
          <div className="myres-spinner" />
          <p>Chargement de vos réservations…</p>
        </div>
      ) : reservations.length === 0 ? (
        <div className="myres-empty">
          <div className="myres-empty-icon">🏍️</div>
          <h3>Aucune réservation</h3>
          <p>Vous n'avez pas encore effectué de location chez AA Motors.</p>
          <Link to="/location-trips" className="myres-btn-primary">
            PARCOURIR LA FLOTTE
          </Link>
        </div>
      ) : (
        <>
          {/* Active reservations */}
          {activeReservations.length > 0 && (
            <section className="myres-section">
              <h2 className="myres-section-title">Réservations actives</h2>
              <div className="myres-grid">
                {activeReservations.map((r) => {
                  const sc = STATUS_CONFIG[r.status] || STATUS_CONFIG.pending;
                  const days = calcDays(r.startDate, r.endDate);
                  const isCancelling = cancellingId === r._id;

                  return (
                    <div key={r._id} className="myres-card">
                      {/* Card header */}
                      <div className="myres-card-header">
                        <div className="myres-card-title-row">
                          <h3 className="myres-vehicle-name">
                            {r.vehicle?.name || "Véhicule"}
                          </h3>
                          <span
                            className="myres-status-badge"
                            style={{ background: sc.bg, color: sc.color, borderColor: sc.border }}
                          >
                            {sc.icon} {sc.label}
                          </span>
                        </div>
                        {r.vehicle?.category && (
                          <p className="myres-vehicle-cat">{r.vehicle.category}</p>
                        )}
                      </div>

                      {/* Dates */}
                      <div className="myres-dates-row">
                        <div className="myres-date-block">
                          <span className="myres-date-label">📅 Départ</span>
                          <span className="myres-date-val">{formatDate(r.startDate)}</span>
                        </div>
                        <div className="myres-date-arrow">→</div>
                        <div className="myres-date-block right">
                          <span className="myres-date-label">🏁 Retour</span>
                          <span className="myres-date-val">{formatDate(r.endDate)}</span>
                        </div>
                      </div>

                      {/* Duration + Price */}
                      <div className="myres-card-footer">
                        <div className="myres-duration-tag">
                          {days} jour{days > 1 ? "s" : ""}
                        </div>
                        {r.totalPrice != null && (
                          <div className="myres-total-price">
                            {Number(r.totalPrice).toLocaleString("fr-FR")} DHS
                          </div>
                        )}
                      </div>

                      {/* Cancel */}
                      {(r.status === "pending" || r.status === "confirmed") && (
                        <button
                          type="button"
                          className="myres-cancel-btn"
                          onClick={() => handleCancel(r._id)}
                          disabled={isCancelling}
                        >
                          {isCancelling ? (
                            <>
                              <span className="myres-mini-spinner" /> Annulation…
                            </>
                          ) : (
                            "Annuler la réservation"
                          )}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Cancelled reservations */}
          {cancelledReservations.length > 0 && (
            <section className="myres-section">
              <h2 className="myres-section-title cancelled-title">Réservations annulées</h2>
              <div className="myres-grid">
                {cancelledReservations.map((r) => {
                  const sc = STATUS_CONFIG.cancelled;
                  const days = calcDays(r.startDate, r.endDate);

                  return (
                    <div key={r._id} className="myres-card cancelled">
                      <div className="myres-card-header">
                        <div className="myres-card-title-row">
                          <h3 className="myres-vehicle-name">
                            {r.vehicle?.name || "Véhicule"}
                          </h3>
                          <span
                            className="myres-status-badge"
                            style={{ background: sc.bg, color: sc.color, borderColor: sc.border }}
                          >
                            {sc.icon} {sc.label}
                          </span>
                        </div>
                      </div>
                      <div className="myres-dates-row">
                        <div className="myres-date-block">
                          <span className="myres-date-label">📅 Départ</span>
                          <span className="myres-date-val">{formatDate(r.startDate)}</span>
                        </div>
                        <div className="myres-date-arrow">→</div>
                        <div className="myres-date-block right">
                          <span className="myres-date-label">🏁 Retour</span>
                          <span className="myres-date-val">{formatDate(r.endDate)}</span>
                        </div>
                      </div>
                      <div className="myres-card-footer">
                        <div className="myres-duration-tag muted">{days} jour{days > 1 ? "s" : ""}</div>
                        {r.totalPrice != null && (
                          <div className="myres-total-price muted">
                            {Number(r.totalPrice).toLocaleString("fr-FR")} DHS
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </>
      )}

      {/* Bottom CTA */}
      {!loading && reservations.length > 0 && (
        <div className="myres-bottom-cta">
          <div className="myres-cta-text">
            <strong>Besoin d'aide avec votre réservation ?</strong>
            <span>Notre équipe est disponible 24h/24 pour vous aider.</span>
          </div>
          <a
            href="https://wa.me/212774593031"
            className="myres-wa-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            💬 Contacter sur WhatsApp
          </a>
        </div>
      )}
    </div>
  );
}

export default MyReservations;
