import React, { useEffect } from "react";
import "./CSS/About.css";

function ConditionsDeVente() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-container">
      <div className="about-content-wrapper reveal-visible">
        <div className="about-header">
          <h1 className="about-title">CONDITIONS DE VENTE</h1>
          <div className="about-divider"></div>
        </div>

        <div className="about-card glass-card">
          <p className="about-text drop-cap">
            Chez <strong>AA Motors</strong>, nous nous engageons à offrir à nos clients les meilleures conditions d’acquisition pour nos gammes de motocycles, quads, SSV et produits de la gamme marine. Les présentes conditions régissent toutes les ventes réalisées au sein de notre showroom ou en ligne.
          </p>

          <h3 className="accent-text">1. Commande et Réservation</h3>
          <p className="about-text">
            Toute commande d'un véhicule neuf ou d'occasion fait l'objet d'un bon de commande écrit. Pour que la commande soit validée, un acompte minimum de 30% du montant total du véhicule est requis lors de la signature. Le solde restant doit être réglé intégralement avant la mise à disposition ou l'immatriculation du véhicule.
          </p>

          <h3 className="accent-text">2. Prix et Modalités de Paiement</h3>
          <p className="about-text">
            Les prix figurant dans nos catalogues et sur notre site web sont indiqués en Dirhams (DH) toutes taxes comprises (TTC). Les frais de dossier d'immatriculation et de carte grise restent à la charge du client sauf mention promotionnelle spécifique. Nous acceptons les règlements par virement bancaire, chèque certifié et financement par crédit partenaire.
          </p>

          <h3 className="accent-text">3. Livraison et Réception</h3>
          <p className="about-text">
            Les délais de livraison sont fournis à titre indicatif lors de la commande. En cas de retard indépendant de notre volonté (douanes, transport maritime international), AA Motors s'engage à tenir le client informé. Lors de la réception, le client doit procéder à une inspection complète du véhicule avec l'un de nos conseillers techniques pour signer le procès-verbal de livraison.
          </p>

          <h3 className="accent-text">4. Annulation et Rétractation</h3>
          <p className="about-text">
            Conformément à la réglementation sur la protection du consommateur au Maroc, le client dispose d'un délai légal de rétractation pour les commandes réalisées à distance. Pour toute commande spéciale de véhicule personnalisé ou immatriculé au nom du client, l'acompte versé ne pourra faire l'objet d'un remboursement en cas d'annulation unilatérale par le client.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ConditionsDeVente;
