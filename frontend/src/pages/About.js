import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-container">
      <div className="about-background"></div>
      <div className="about-overlay"></div>

      <div className="about-content">

        <p className="about-text">
          Bienvenue chez notre concessionnaire Yamaha au Maroc, fondé en 2025 avec une vision claire : offrir aux passionnés de motos une expérience complète, fiable et professionnelle.
        </p>

        <p className="about-text">
          Nous sommes spécialisés dans la vente de motos Yamaha neuves et d’occasion, la location de motos pour particuliers et touristes, ainsi que l’organisation de trips et d’aventures à moto à travers le Maroc.
        </p>

        <p className="about-text">
          Notre mission est de rendre la moto accessible à tous, que ce soit pour un usage quotidien, un voyage touristique ou une aventure inoubliable dans les paysages marocains — des villes modernes aux routes désertiques et montagnes.
        </p>

        <p className="about-text">Grâce à notre équipe passionnée et expérimentée, nous garantissons :</p>
        <ul className="about-list">
          <li>Des motos de qualité et bien entretenues</li>
          <li>Un service client rapide et professionnel</li>
          <li>Des solutions de location flexibles</li>
          <li>Des trips organisés en toute sécurité</li>
        </ul>

        <p className="about-text">
          Depuis notre création en 2025, nous travaillons chaque jour pour devenir une référence dans le domaine de la moto au Maroc, en mettant l’accent sur la confiance, la sécurité et la satisfaction de nos clients.
        </p>

        <p className="about-footer">
          Rejoignez-nous et vivez l’expérience Yamaha au Maroc.
        </p>
      </div>
    </div>
  );
}

export default About;