import React, { useEffect } from "react";
import "./CSS/About.css";

function ServiceApresVente() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-container">
      <div className="about-content-wrapper reveal-visible">
        <div className="about-header">
          <h1 className="about-title">SERVICE APRÈS-VENTE (SAV)</h1>
          <div className="about-divider"></div>
        </div>

        <div className="about-card glass-card">
          <p className="about-text drop-cap">
            Le Service Après-Vente de <strong>AA Motors</strong> constitue le pilier de notre engagement envers l'excellence. Nos équipes de techniciens hautement qualifiés et formés directement par Yamaha Motor garantissent un entretien irréprochable de votre machine.
          </p>

          <h3 className="accent-text">1. Notre Expertise Technique</h3>
          <p className="about-text">
            Notre atelier central de Casablanca dispose d'équipements de diagnostic électronique de dernière génération (YDT - Yamaha Diagnostic Tool) pour analyser, paramétrer et optimiser les performances de votre moteur. Qu'il s'agisse d'une révision périodique, d'un changement de pièces ou d'une reconstruction moteur complète, votre machine est entre des mains expertes.
          </p>

          <h3 className="accent-text">2. Pièces de Rechange d'Origine</h3>
          <p className="about-text">
            Nous utilisons exclusivement des <strong>Pièces d'Origine Yamaha (Yamaha Genuine Parts)</strong> et les lubrifiants <strong>Yamalube</strong> spécialement formulés pour optimiser la longévité et le rendement de votre moteur. Notre stock permanent nous permet de répondre rapidement à vos besoins en pièces de rechange et accessoires d'origine.
          </p>

          <h3 className="accent-text">3. Prestations et Services Proposés</h3>
          <ul className="about-list futuristic-list">
            <li><span>Entretien programmé et vidange moteur.</span></li>
            <li><span>Diagnostic électronique complet YDT.</span></li>
            <li><span>Remplacement d'organes de sécurité (freinage, suspensions, pneumatiques).</span></li>
            <li><span>Préparation de machines tout-terrain (Quads, SSV) et routières pour les longs trajets.</span></li>
            <li><span>Hivernage et entretien spécifique pour moteurs de WaveRunners et Jet Boats.</span></li>
          </ul>

          <h3 className="accent-text">4. Prise de Rendez-vous Atelier</h3>
          <p className="about-text">
            Pour réduire votre temps d'immobilisation, nous vous invitons à planifier votre passage à l'atelier à l'avance. Contactez notre atelier de Casablanca directement par téléphone au <strong>06 63 58 63 70</strong> ou par email à l'adresse <strong>sav@aamotors.ma</strong> pour convenir d'un rendez-vous.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ServiceApresVente;
