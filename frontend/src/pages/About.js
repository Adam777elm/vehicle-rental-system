import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-container">
      <div className="about-background"></div>

      <div className="about-content-wrapper reveal-visible">
        <div className="about-header">
          <h1 className="about-title">POLITIQUES DE QUALITÉ</h1>
          <div className="about-divider"></div>
        </div>

        <div className="about-card glass-card">
          <p className="about-text drop-cap">
            Dans un environnement caractérisé par une concurrence intense et des attentes toujours plus élevées de la part de nos partenaires et clients, <strong>AA Motors</strong> affirme sa volonté de consolider sa position sur le marché marocain de la mobilité terrestre et maritime. L’entreprise ambitionne également de devenir une référence en Afrique en tant que distributeur exemplaire de YAMAHA MOTOR JAPAN.
          </p>

          <p className="about-text">
            Fort d’une vision orientée vers l’innovation et la performance, <strong>AA Motors</strong> s’engage à développer un modèle d’affaires moderne et efficace, basé sur l’excellence opérationnelle, la rentabilité durable et la satisfaction continue de l’ensemble de ses parties prenantes.
          </p>

          <p className="about-text">
            Dans cette perspective, nous avons décidé de mettre en place un Système de Management de la Qualité (SMQ) conforme aux exigences de la norme internationale, afin d’assurer une organisation structurée, performante et tournée vers l’amélioration continue.
          </p>

          <p className="about-text accent-text">
            Notre politique qualité repose sur plusieurs axes stratégiques essentiels :
          </p>

          <ul className="about-list futuristic-list">
            <li><span>Renforcer et développer notre partenariat avec YAMAHA MOTOR JAPAN.</span></li>
            <li><span>Assurer un niveau élevé de satisfaction des clients et partenaires en proposant des services qui dépassent leurs attentes.</span></li>
            <li><span>Offrir un service après-vente de haute qualité, basé sur l’expertise de techniciens qualifiés et sur des procédures adaptées pour garantir la fiabilité et la longévité des produits YAMAHA.</span></li>
            <li><span>Valoriser, former et faire évoluer nos collaborateurs afin d’assurer la qualité et l’excellence de nos services.</span></li>
            <li><span>Améliorer en permanence nos processus internes tout en respectant les exigences légales et réglementaires liées à nos activités.</span></li>
            <li><span>Créer une valeur durable et assurer une performance économique stable pour nos actionnaires.</span></li>
          </ul>

          <div className="about-commitment">
            <p className="about-text statement">
              La Direction Générale de <strong>AA Motors</strong> s’engage à mobiliser l’ensemble des ressources nécessaires pour atteindre ces objectifs et assurer la réussite de cette démarche.
            </p>
            <p className="about-text statement">
              La mise en place de cette certification représente un projet structurant pour l’entreprise, dont la réussite dépend de l’implication de tous les collaborateurs. C’est pourquoi nous encourageons chaque membre de notre équipe à participer activement à cette dynamique d’amélioration continue, essentielle à la croissance et à la pérennité de <strong>AA Motors</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;