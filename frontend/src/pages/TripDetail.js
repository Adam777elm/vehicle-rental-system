import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { tripPackages } from "../data/tripData";
import { RENTAL_FLEET, formatPricePerDay } from "../data/rentalFleet";
import API from "../services/api";
import "./CSS/TripDetail.css";

function TripDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const trip = tripPackages.find((t) => t.id === parseInt(id));

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [hasOwnMoto, setHasOwnMoto] = useState(true);
  const [selectedMoto, setSelectedMoto] = useState(null);

  // Form states for booking
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    message: ""
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!trip) {
    return <div className="trip-detail-error">Trip introuvable.</div>;
  }

  // Calculate rental cost
  const tripDays = parseInt(trip.duration.split(" ")[0]) || 0;
  const rentalPrice = selectedMoto && !hasOwnMoto ? selectedMoto.pricePerDay * tripDays : 0;
  const totalPrice = trip.price + rentalPrice;

  // Recommended motos: filter RENTAL_FLEET (just take the first 4 for now as an example)
  const recommendedMotos = RENTAL_FLEET.slice(0, 4);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const destinationStr = `TRIP: ${trip.title} | MOTO: ${hasOwnMoto ? "Moto Personnelle" : selectedMoto?.name}`;
      
      await API.post("/bookings", {
        nom: formData.nom,
        email: formData.email,
        telephone: formData.telephone,
        destination: destinationStr,
        message: formData.message,
        type: "Trip",
        prixTotal: `${totalPrice.toLocaleString()} DH`
      });
      
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        navigate("/location-trips");
      }, 4000);
    } catch (err) {
      console.error(err);
      alert("Une erreur est survenue lors de la réservation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="trip-detail-page">
      <div className="trip-detail-header">
        <h1>{trip.title}</h1>
        <p className="trip-tag">{trip.tag}</p>
      </div>

      <div className="trip-detail-top-grid">
        {/* BLOC 1: Images */}
        <div className="trip-bloc-1-images">
          <div className="trip-main-image-container">
            <img src={trip.gallery[activeImgIndex]} alt={trip.title} className="trip-main-image" />
          </div>
          <div className="trip-thumbnails">
            {trip.gallery.map((img, idx) => (
              <img 
                key={idx}
                src={img} 
                alt={`${trip.title} ${idx}`}
                className={idx === activeImgIndex ? "trip-thumb active" : "trip-thumb"}
                onClick={() => setActiveImgIndex(idx)}
              />
            ))}
          </div>
        </div>

        {/* BLOC 2: Itinéraire Google Maps & Infos */}
        <div className="trip-bloc-2-map">
          <div className="trip-map-container">
            <iframe 
              src={trip.mapEmbedUrl}
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map for ${trip.title}`}
            ></iframe>
          </div>
          <div className="trip-stats-grid">
            <div className="trip-stat-item">
              <span className="stat-icon">🛣️</span>
              <div className="stat-text">
                <strong>Kilométrage</strong>
                <span>{trip.km}</span>
              </div>
            </div>
            <div className="trip-stat-item">
              <span className="stat-icon">⏳</span>
              <div className="stat-text">
                <strong>Durée</strong>
                <span>{trip.duration}</span>
              </div>
            </div>
            <div className="trip-stat-item">
              <span className="stat-icon">☕</span>
              <div className="stat-text">
                <strong>Pauses Recommandées</strong>
                <span>{trip.pauses}</span>
              </div>
            </div>
            <div className="trip-stat-item">
              <span className="stat-icon">⏱️</span>
              <div className="stat-text">
                <strong>Temps de Conduite</strong>
                <span>{trip.tempsTotal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BLOC 3: Choix de la moto & Total */}
      <div className="trip-bloc-3-config">
        <h2>Configurez votre Aventure</h2>
        <p>{trip.desc}</p>
        
        <div className="moto-choice-toggle">
          <button 
            className={hasOwnMoto ? "choice-btn active" : "choice-btn"}
            onClick={() => setHasOwnMoto(true)}
          >
            J'AI MA PROPRE MOTO
          </button>
          <button 
            className={!hasOwnMoto ? "choice-btn active" : "choice-btn"}
            onClick={() => {
              setHasOwnMoto(false);
              if (!selectedMoto) setSelectedMoto(recommendedMotos[0]);
            }}
          >
            JE VEUX LOUER UNE MOTO
          </button>
        </div>

        {!hasOwnMoto && (
          <div className="rental-motos-slider">
            <h3>Motos Recommandées pour ce Trip</h3>
            <div className="rental-motos-grid">
              {recommendedMotos.map((moto) => (
                <div 
                  key={moto.id} 
                  className={selectedMoto?.id === moto.id ? "rental-moto-card selected" : "rental-moto-card"}
                  onClick={() => setSelectedMoto(moto)}
                >
                  <img src={moto.image} alt={moto.name} />
                  <h4>{moto.name}</h4>
                  <p>{formatPricePerDay(moto.pricePerDay)} DH / jour</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="trip-booking-summary">
          <div className="summary-details">
            <h3>Résumé du Tarif</h3>
            <ul>
              <li>Frais du Trip Organisé: <span>{trip.price.toLocaleString()} DH</span></li>
              {!hasOwnMoto && selectedMoto && (
                <li>
                  Location Moto ({selectedMoto.name} x {tripDays}j): 
                  <span>{rentalPrice.toLocaleString()} DH</span>
                </li>
              )}
            </ul>
            <div className="total-price">
              Total: <span>{totalPrice.toLocaleString()} DH</span>
            </div>
          </div>

          <form className="trip-booking-form" onSubmit={handleBooking}>
            <h3>Vos Coordonnées</h3>
            <div className="form-row">
              <input type="text" name="nom" placeholder="Nom complet" value={formData.nom} onChange={handleInputChange} required />
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
            </div>
            <div className="form-row">
              <input type="tel" name="telephone" placeholder="Téléphone" value={formData.telephone} onChange={handleInputChange} required />
            </div>
            <textarea name="message" placeholder="Demande spéciale ou question ?" value={formData.message} onChange={handleInputChange}></textarea>
            
            <button type="submit" className="btn-confirm-booking" disabled={loading}>
              {loading ? "ENVOI..." : "RÉSERVER CE TRIP"}
            </button>
            
            {formSubmitted && (
              <div className="success-msg">✅ Votre demande de réservation a été envoyée avec succès !</div>
            )}
          </form>
        </div>
      </div>

      {/* BLOC 4: Programme Détaillé */}
      <div className="trip-bloc-4-itinerary">
        <div className="itinerary-header-row">
          <h2>Programme Détaillé</h2>
          <button onClick={() => {
            const content = `PROGRAMME DU TRIP : ${trip.title}\n\n` + 
                            `Kilométrage: ${trip.km}\nDurée: ${trip.duration}\n\n` +
                            (trip.itinerary ? trip.itinerary.map(item => `${item.day} - ${item.title}\n${item.details}\n`).join("\n") : "Programme sur mesure.");
            const blob = new Blob([content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Programme_${trip.title.replace(/\s+/g, '_')}.txt`;
            a.click();
            URL.revokeObjectURL(url);
          }} className="btn-download-pdf">
            📄 Télécharger le Programme
          </button>
        </div>
        
        {trip.itinerary ? (
          <div className="itinerary-timeline">
            {trip.itinerary.map((item, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <span className="timeline-day">{item.day}</span>
                  <h3 className="timeline-title">{item.title}</h3>
                  <p className="timeline-details">{item.details}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Détails du programme à venir.</p>
        )}
      </div>

    </div>
  );
}

export default TripDetail;
