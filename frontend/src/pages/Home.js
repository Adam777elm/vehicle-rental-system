import React, { useState, useRef, useEffect } from "react";
import "./Home.css";
import motoVideo from "../assets/HOME_IMG/MotoVid.mp4";

import motoImg from "../assets/HOME_IMG/R1-1.jpg";
import locaImg from "../assets/HOME_IMG/Loca-1.webp";
import marineImg from "../assets/HOME_IMG/JetSki-1.jpg";
import equipImg from "../assets/HOME_IMG/Equip-1.avif";

function Home() {
  const [muted, setMuted] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // Couper le son si on a défilé 90% de la vidéo
      if (videoRef.current) {
        const videoHeight = videoRef.current.offsetHeight;
        if (window.scrollY > videoHeight * 0.9 && !videoRef.current.muted) {
          videoRef.current.muted = true;
          setMuted(true);
        }
      }
    };

    const handleVisibilityChange = () => {
      // Couper le son si on change d'onglet
      if (document.hidden && videoRef.current && !videoRef.current.muted) {
        videoRef.current.muted = true;
        setMuted(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  };

  const categories = [
    {
      id: 1,
      title: "Motos",
      subtitle: "REVS YOUR HEART",
      image: motoImg,
      link: "/motos"
    },
    {
      id: 2,
      title: "Location&Trips",
      subtitle: "DISCOVER   FREEDOM",
      image: motoImg, /* Utilisation temporaire de la R1 en attendant une image avec un fond clair */
      link: "/location-trips"
    },
    {
      id: 3,
      title: "Marine",
      subtitle: "FEEL THE WATER",
      image: marineImg,
      link: "/marine"
    },
    {
      id: 4,
      title: "Equipement",
      subtitle: "RIDE IN STYLE",
      image: equipImg,
      link: "/equipement"
    }
  ];

  return (
    <div className="home-container">
      {/* HERO SECTION WITH VIDEO */}
      <section className="hero">
        <video
          ref={videoRef}
          className="hero-video"
          autoPlay
          loop
          muted={muted}
          playsInline
        >
          <source
            src={motoVideo}
            type="video/mp4"
          />
          Votre navigateur ne supporte pas la vidéo.
        </video>

        <div className="video-overlay">
          <div className="hero-content">
            <p className="hero-top-text">New Generation of <br /> supersport</p>
          </div>
        </div>

        {/* SOUND TOGGLE */}
        <button className="sound-toggle" onClick={toggleSound}>
          {muted ? (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z" /><path d="M23 9l-6 6" /><path d="M17 9l6 6" /></svg>
              <span>SOUND OFF</span>
            </>
          ) : (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /></svg>
              <span>SOUND ON</span>
            </>
          )}
        </button>
      </section>

      {/* CATEGORIES GRID */}
      <section className="categories-section">
        <div className="categories-grid">
          {categories.map((cat) => (
            <a key={cat.id} href={cat.link} className="category-box">
              <img src={cat.image} alt={cat.title} className="category-image" />
              <div className="category-overlay">
                <span className="category-subtitle">{cat.subtitle}</span>
                <h2 className="category-title">{cat.title}</h2>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;