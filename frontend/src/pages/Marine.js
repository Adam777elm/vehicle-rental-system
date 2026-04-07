import React, { useState, useRef } from "react";
import "./Marine.css";
import heroImg from "../assets/MARINE_IMG/marine-hero.jpg";
import marineVideo from "../assets/MARINE_IMG/hero-video.mp4"; // Le chemin sera prêt pour votre vidéo

function Marine() {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  return (
    <div className="marine-page">
      <div className="marine-red-bar"></div>

      <section className="marine-hero-banner">
        <img src={heroImg} alt="Yamaha WaveRunner Marine" className="marine-banner-img" />
        <div className="marine-banner-overlay">
          <h1 className="marine-banner-title">Marine</h1>
        </div>
      </section>

      {/* FUTURISTIC SEPARATOR */}
      <div className="futuristic-separator">
        <div className="separator-line"></div>
        <div className="separator-diamond"></div>
        <div className="separator-line"></div>
      </div>

      {/* SECONDARY VIDEO SECTION */}
      <section className="marine-video-section">
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted={isMuted} 
          playsInline 
          className="marine-secondary-video"
        >
          <source src={marineVideo} type="video/mp4" />
        </video>
        <div className="marine-video-overlay"></div>
        <button className="sound-toggle-btn" onClick={toggleMute}>
          {isMuted ? "🔇 SOUND OFF" : "🔊 SOUND ON"}
        </button>
      </section>

      <section className="marine-content-section">
        <h2 className="marine-section-title">Découvrir la gamme Marine</h2>
        <div className="marine-placeholder-grid"></div>
      </section>
    </div>
  );
}

export default Marine;
