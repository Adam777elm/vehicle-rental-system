import React, { useEffect } from "react";
import "./CSS/About.css";

function ConditionsDeGarantie() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-container">
      <div className="about-content-wrapper reveal-visible">
        <div className="about-header">
          <h1 className="about-title">CONDITIONS DE GARANTIE</h1>
          <div className="about-divider"></div>
        </div>

        <div className="about-card glass-card">
          <p className="about-text drop-cap">
            Tous les véhicules neufs distribués par <strong>AA Motors</strong> bénéficient de la garantie constructeur officielle de <strong>YAMAHA MOTOR</strong>. Cette garantie assure à nos clients une tranquillité d'esprit absolue contre tout défaut de fabrication ou de pièce.
          </p>

          <h3 className="accent-text">1. Durée de la Garantie</h3>
          <p className="about-text">
            La garantie constructeur s'applique pour une durée de <strong>2 ans (24 mois)</strong> pour les motocycles routiers et scooters à compter de la date de livraison initiale au premier acheteur. Pour les quads et SSV à usage de loisir, la garantie s'applique pour une durée de 12 mois. La gamme marine (moteurs hors-bord et Waverunners) bénéficie également de conditions de garantie spécifiques détaillées lors de l'achat.
          </p>

          <h3 className="accent-text">2. Conditions d'Application</h3>
          <p className="about-text">
            Pour maintenir la validité de la garantie, l'acheteur doit obligatoirement effectuer les entretiens périodiques préconisés par le constructeur dans les ateliers agréés AA Motors de Casablanca, en respectant les intervalles de temps et de kilométrage définis dans le carnet d'entretien.
          </p>

          <h3 className="accent-text">3. Exclusions de Garantie</h3>
          <p className="about-text">
            Sont expressément exclues de la garantie constructeur :
          </p>
          <ul className="about-list futuristic-list">
            <li><span>Les pièces d'usure courante (pneumatiques, plaquettes de frein, filtres, bougies, embrayage, fluides).</span></li>
            <li><span>Les dommages causés par une utilisation anormale (compétition, surrégime, surcharge).</span></li>
            <li><span>Les modifications ou installations de pièces non-originales ou accessoires non homologués par Yamaha.</span></li>
            <li><span>Les réparations ou entretiens effectués en dehors des ateliers certifiés AA Motors.</span></li>
          </ul>

          <h3 className="accent-text">4. Prise en Charge</h3>
          <p className="about-text">
            La garantie couvre la réparation ou le remplacement gratuit des pièces reconnues défectueuses par nos services techniques, ainsi que la main d'œuvre associée. Le véhicule doit être présenté dans nos ateliers pour toute demande de prise en charge sous garantie.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ConditionsDeGarantie;
