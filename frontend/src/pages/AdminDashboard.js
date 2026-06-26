import React, { useState, useEffect, useCallback } from "react";
import API from "../services/api";
import { ALL_VEHICLES } from "../components/Navbar";
import "./CSS/AdminDashboard.css";

// MOCK DATA for Admin panel representation
const INITIAL_MARKETPLACE = [
  { id: 1, name: "Yamaha MT-07 Custom", price: "78 000 DH", seller: "Youssef El", image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2024/MT700A/2024-Yamaha-MT700A-EU-Storm_Fluo-360-Degrees-001-03.jpg", status: "en attente" },
  { id: 2, name: "Yamaha YZF-R1M", price: "260 000 DH", seller: "Karim B.", image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2024/YZF1000R1SPL/2024-Yamaha-YZF1000R1SPL-EU-Icon_Performance-360-Degrees-001-03_Mobile.jpg", status: "approuvé" },
  { id: 3, name: "TMAX 560 Tech Max", price: "152 000 DH", seller: "Anass M.", image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2025/XP500A/2025-Yamaha-XP500A-EU-Icon_Black_-Studio-001-03.jpg", status: "en attente" },
  { id: 4, name: "Tracer 9 GT 2023", price: "138 000 DH", seller: "Mehdi K.", image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2025/MT09ATRDXS/2025-Yamaha-MT09ATRDXS-EU-Ceramic_Ice-360-Degrees-001-03_Mobile.jpg", status: "refusé" },
  { id: 5, name: "NMAX 155 Tech Grey", price: "46 000 DH", seller: "Sofia L.", image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2025/G125YMSV/2025-Yamaha-G125YMSV-EU-Ceramic_Grey-360-Degrees-001-03_Mobile.jpg", status: "approuvé" }
];

const INITIAL_ORDERS = [
  { id: "CMD-8721", client: "Hamza Bennani", vehicle: "Yamaha YZF-R9", price: "155 000 DH", date: "2026-06-01", status: "en attente" },
  { id: "CMD-8659", client: "Nadia Tazi", vehicle: "Scooter XMAX 300", price: "85 000 DH", date: "2026-05-29", status: "confirmé" },
  { id: "CMD-8630", client: "Omar Alaoui", vehicle: "Yamaha MT-10 SP", price: "195 000 DH", date: "2026-05-28", status: "livré" },
  { id: "CMD-8541", client: "Imane Regragui", vehicle: "Tracer 7 GT", price: "105 000 DH", date: "2026-05-24", status: "annulé" },
  { id: "CMD-8512", client: "Khalid Jouahri", vehicle: "Yamaha R1M", price: "285 000 DH", date: "2026-05-22", status: "confirmé" }
];

const INITIAL_RENTALS = [
  { id: "LOC-202", client: "Adnane Sbaï", vehicle: "Yamaha TMAX (Location)", duration: "3 Jours", dateStart: "2026-06-10", dateEnd: "2026-06-13", status: "réservé" },
  { id: "LOC-199", client: "Yasmine Filali", vehicle: "MT-09 SP Roadster", duration: "1 Jour", dateStart: "2026-06-05", dateEnd: "2026-06-06", status: "réservé" },
  { id: "LOC-194", client: "Zouhair Amrani", vehicle: "Tracer 9 GT Tourer", duration: "5 Jours", dateStart: "2026-05-30", dateEnd: "2026-06-04", status: "en cours" },
  { id: "LOC-189", client: "Noureddine B.", vehicle: "Yamaha NMAX 125", duration: "7 Jours", dateStart: "2026-05-20", dateEnd: "2026-05-27", status: "terminé" },
  { id: "LOC-182", client: "Ghita Messari", vehicle: "Jet-Ski Waverunner", duration: "2 Jours", dateStart: "2026-05-15", dateEnd: "2026-05-17", status: "annulé" }
];

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("marketplace");
  const [marketplaceList, setMarketplaceList] = useState(INITIAL_MARKETPLACE);
  const [ordersList, setOrdersList] = useState([]);
  const [rentalsList, setRentalsList] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  // Reset search when changing tabs
  useEffect(() => {
    setSearchQuery("");
  }, [activeTab]);

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const ADMIN_EMAILS = ['admin@aamotors.ma', 'eelmadam2004@gmail.com'];
  const isAdmin = user && (ADMIN_EMAILS.includes(user.email) || user.email.toLowerCase().includes('admin'));

  const fetchData = useCallback(async (showSpinner = false) => {
    const token = localStorage.getItem("token");
    if (!token || !isAdmin) return;

    if (showSpinner) setIsRefreshing(true);

    try {
      // Fetch Orders & Rentals in parallel
      const [ordersRes, rentalsRes] = await Promise.all([
        API.get("/orders", { headers: { Authorization: `Bearer ${token}` } }),
        API.get("/reservations", { headers: { Authorization: `Bearer ${token}` } })
      ]);

      const mappedOrders = ordersRes.data.map(order => ({
        id: order._id,
        client: order.fullName || (order.user ? order.user.name : "Client inconnu"),
        vehicle: order.items.map(item => `${item.name} (${item.quantity}x) ${item.color && item.color !== 'Standard' ? `[${item.color}]` : ""}`).join(", "),
        price: `${order.totalPrice.toLocaleString()} DH`,
        date: new Date(order.createdAt).toISOString().split("T")[0],
        status: order.status
      }));
      setOrdersList(mappedOrders);

      const mappedRentals = rentalsRes.data.map(reser => {
        const start = new Date(reser.startDate);
        const end = new Date(reser.endDate);
        const diffDays = Math.ceil(Math.abs(end - start) / (1000 * 60 * 60 * 24));
        let adminStatus = "réservé";
        if (reser.status === "confirmed") adminStatus = "en cours";
        if (reser.status === "cancelled") adminStatus = "annulé";
        return {
          id: reser._id,
          client: reser.user ? reser.user.name : "Client inconnu",
          vehicle: reser.vehicle ? reser.vehicle.name : "Véhicule supprimé",
          dateStart: start.toISOString().split("T")[0],
          dateEnd: end.toISOString().split("T")[0],
          duration: `${diffDays} Jour${diffDays > 1 ? "s" : ""}`,
          status: adminStatus
        };
      });
      setRentalsList(mappedRentals);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Error fetching admin data:", err);
    } finally {
      if (showSpinner) setIsRefreshing(false);
    }
  }, [isAdmin]);

  // Initial load + auto-refresh every 30 seconds
  useEffect(() => {
    fetchData();
    const interval = setInterval(() => fetchData(), 30000);
    return () => clearInterval(interval);
  }, [fetchData]);

  if (!isAdmin) {
    return (
      <div className="admin-dashboard-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 120px)' }}>
        <div className="admin-top-red-bar"></div>
        <div className="access-denied-box" style={{
          maxWidth: '500px',
          width: '100%',
          padding: '40px',
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(234, 63, 51, 0.3)',
          backdropFilter: 'blur(16px)',
          borderRadius: '20px',
          textAlign: 'center',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(234, 63, 51, 0.1)'
        }}>
          <span style={{ fontSize: '64px', marginBottom: '20px', display: 'block' }}>🚫</span>
          <h2 style={{ fontFamily: 'Outfit', fontSize: '2rem', fontWeight: 900, color: '#ffffff', margin: '0 0 15px 0' }}>
            ACCÈS REFUSÉ
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', lineHeight: 1.6, margin: '0 0 30px 0' }}>
            Ce panneau d'administration est strictement réservé aux gérants et administrateurs d'AA Motors.
            Veuillez vous connecter avec un compte administrateur.
          </p>
          <a 
            href="/login" 
            style={{ 
              display: 'inline-block',
              background: 'linear-gradient(135deg, var(--yamaha-red), #b3140e)',
              color: 'white',
              padding: '14px 30px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 800,
              fontSize: '15px',
              boxShadow: '0 4px 15px var(--yamaha-red-glow)',
              transition: 'all 0.3s'
            }}
          >
            Se connecter
          </a>
        </div>
      </div>
    );
  }

  // Total stats values (calculated dynamically)
  const totalVehicles = ALL_VEHICLES.length;
  const pendingOrders = ordersList.filter(o => o.status === "en attente").length;
  const activeRentalsCount = rentalsList.filter(r => r.status === "en cours" || r.status === "réservé").length;
  
  const totalRevenue = ordersList
    .filter(o => o.status === "confirmé" || o.status === "livré")
    .reduce((sum, o) => sum + parseInt(o.price.replace(/\D/g, ""), 10), 0)
    .toLocaleString();

  // Actions for Marketplace
  const handleApproveMarket = (id) => {
    setMarketplaceList(prev => prev.map(item => item.id === id ? { ...item, status: "approuvé" } : item));
  };

  const handleRejectMarket = (id) => {
    setMarketplaceList(prev => prev.map(item => item.id === id ? { ...item, status: "refusé" } : item));
  };

  const handleDeleteMarket = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette annonce ?")) {
      setMarketplaceList(prev => prev.filter(item => item.id !== id));
    }
  };

  // Status changes for Orders & Rentals
  const handleOrderStatusChange = async (id, newStatus) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await API.put(`/orders/${id}/status`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrdersList(prev => prev.map(order => order.id === id ? { ...order, status: newStatus } : order));
    } catch (err) {
      alert("Erreur lors de la mise à jour du statut de la commande : " + (err.response?.data?.message || err.message));
    }
  };

  const handleRentalStatusChange = async (id, newStatus) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    let dbStatus = "pending";
    if (newStatus === "en cours" || newStatus === "terminé") {
      dbStatus = "confirmed";
    } else if (newStatus === "annulé") {
      dbStatus = "cancelled";
    }

    try {
      await API.put(`/reservations/${id}/status`, { status: dbStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRentalsList(prev => prev.map(rental => rental.id === id ? { ...rental, status: newStatus } : rental));
    } catch (err) {
      alert("Erreur lors de la mise à jour du statut du contrat : " + (err.response?.data?.message || err.message));
    }
  };

  // Filter lists based on search
  const filteredMarket = marketplaceList.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.seller.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredOrders = ordersList.filter(order => 
    order.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredRentals = rentalsList.filter(rental => 
    rental.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rental.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rental.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="admin-dashboard-page">
      <div className="admin-top-red-bar"></div>

      <div className="admin-container">
        {/* HEADER */}
        <div className="admin-header">
          <div>
            <h1 className="admin-title">TABLEAU DE BORD ADMIN</h1>
            <p className="admin-subtitle">Gérez le marketplace, les commandes d'achat et les locations de véhicules.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
            <span className="admin-badge">ADMINISTRATION AREA</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {lastUpdated && (
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', fontFamily: 'Outfit' }}>
                  🕐 Mis à jour : {lastUpdated.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
              )}
              <button
                onClick={() => fetchData(true)}
                disabled={isRefreshing}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  background: isRefreshing ? 'rgba(255,255,255,0.05)' : 'rgba(234,63,51,0.15)',
                  border: '1px solid rgba(234,63,51,0.4)',
                  color: isRefreshing ? 'rgba(255,255,255,0.4)' : '#ea3f33',
                  borderRadius: '8px', padding: '7px 14px',
                  fontFamily: 'Outfit', fontWeight: 700, fontSize: '13px',
                  cursor: isRefreshing ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <span style={{ display: 'inline-block', animation: isRefreshing ? 'spin 1s linear infinite' : 'none' }}>🔄</span>
                {isRefreshing ? 'Actualisation…' : 'Actualiser'}
              </button>
            </div>
          </div>
        </div>
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>

        {/* STATS OVERVIEW CARDS */}
        <div className="admin-stats-grid">
          <div className="admin-stat-card border-red">
            <div className="stat-info">
              <span className="stat-label">Catalogue Véhicules</span>
              <h3 className="stat-val">{totalVehicles}</h3>
            </div>
            <div className="stat-icon-wrapper red">📊</div>
          </div>
          <div className="admin-stat-card border-yellow">
            <div className="stat-info">
              <span className="stat-label">Commandes en Attente</span>
              <h3 className="stat-val">{pendingOrders}</h3>
            </div>
            <div className="stat-icon-wrapper yellow">⏳</div>
          </div>
          <div className="admin-stat-card border-blue">
            <div className="stat-info">
              <span className="stat-label">Locations Actives</span>
              <h3 className="stat-val">{activeRentalsCount}</h3>
            </div>
            <div className="stat-icon-wrapper blue">🔑</div>
          </div>
          <div className="admin-stat-card border-green">
            <div className="stat-info">
              <span className="stat-label">Chiffre d'Affaires</span>
              <h3 className="stat-val">{totalRevenue} DH</h3>
            </div>
            <div className="stat-icon-wrapper green">💰</div>
          </div>
        </div>

        {/* TAB NAVIGATION & SEARCH BAR */}
        <div className="admin-controls-wrapper">
          <div className="admin-tabs">
            <button 
              className={`admin-tab-btn ${activeTab === "marketplace" ? "active" : ""}`}
              onClick={() => setActiveTab("marketplace")}
            >
              Marketplace P2P ({marketplaceList.length})
            </button>
            <button 
              className={`admin-tab-btn ${activeTab === "orders" ? "active" : ""}`}
              onClick={() => setActiveTab("orders")}
            >
              Commandes Achats ({ordersList.length})
            </button>
            <button 
              className={`admin-tab-btn ${activeTab === "rentals" ? "active" : ""}`}
              onClick={() => setActiveTab("rentals")}
            >
              Contrats Location ({rentalsList.length})
            </button>
          </div>

          <div className="admin-search-wrapper">
            <input 
              type="text"
              placeholder="Rechercher..."
              className="admin-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="search-input-icon">🔍</span>
          </div>
        </div>

        {/* TAB CONTENTS */}
        <div className="admin-table-container">
          
          {/* TAB 1: MARKETPLACE */}
          {activeTab === "marketplace" && (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Aperçu</th>
                  <th>Nom Moto</th>
                  <th>Prix demandé</th>
                  <th>Vendeur</th>
                  <th>Statut</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMarket.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="no-records">Aucun enregistrement trouvé.</td>
                  </tr>
                ) : (
                  filteredMarket.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <img src={item.image} alt={item.name} className="table-img" />
                      </td>
                      <td>
                        <span className="table-bold-text">{item.name}</span>
                      </td>
                      <td>
                        <span className="table-price-text">{item.price}</span>
                      </td>
                      <td>{item.seller}</td>
                      <td>
                        <span className={`status-pill ${
                          item.status === "approuvé" ? "green" : 
                          item.status === "refusé" ? "red" : "yellow"
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <div className="actions-cell">
                          {item.status === "en attente" && (
                            <>
                              <button 
                                onClick={() => handleApproveMarket(item.id)} 
                                className="action-btn approve"
                                title="Approuver l'annonce"
                              >
                                ✓ Approuver
                              </button>
                              <button 
                                onClick={() => handleRejectMarket(item.id)} 
                                className="action-btn reject"
                                title="Rejeter l'annonce"
                              >
                                ✕ Rejeter
                              </button>
                            </>
                          )}
                          <button 
                            onClick={() => handleDeleteMarket(item.id)} 
                            className="action-btn delete"
                            title="Supprimer"
                          >
                            🗑
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}

          {/* TAB 2: ORDERS */}
          {activeTab === "orders" && (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Réf Commande</th>
                  <th>Client</th>
                  <th>Moto commandée</th>
                  <th>Prix total</th>
                  <th>Date</th>
                  <th>Statut</th>
                  <th style={{ textAlign: "right" }}>Changer Statut</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="no-records">Aucune commande trouvée.</td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.id}>
                      <td>
                        <span className="table-bold-text text-neon-blue">{order.id}</span>
                      </td>
                      <td>{order.client}</td>
                      <td>{order.vehicle}</td>
                      <td>
                        <span className="table-price-text">{order.price}</span>
                      </td>
                      <td>{order.date}</td>
                      <td>
                        <span className={`status-pill ${
                          order.status === "livré" ? "green" : 
                          order.status === "confirmé" ? "blue" : 
                          order.status === "annulé" ? "red" : "yellow"
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <select 
                          className="table-select"
                          value={order.status}
                          onChange={(e) => handleOrderStatusChange(order.id, e.target.value)}
                        >
                          <option value="en attente">En attente</option>
                          <option value="confirmé">Confirmé</option>
                          <option value="livré">Livré</option>
                          <option value="annulé">Annulé</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}

          {/* TAB 3: RENTALS */}
          {activeTab === "rentals" && (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Réf Contrat</th>
                  <th>Locataire</th>
                  <th>Moto de location</th>
                  <th>Date début</th>
                  <th>Date fin</th>
                  <th>Durée</th>
                  <th>Statut</th>
                  <th style={{ textAlign: "right" }}>Changer Statut</th>
                </tr>
              </thead>
              <tbody>
                {filteredRentals.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="no-records">Aucune location trouvée.</td>
                  </tr>
                ) : (
                  filteredRentals.map((rental) => (
                    <tr key={rental.id}>
                      <td>
                        <span className="table-bold-text text-neon-blue">{rental.id}</span>
                      </td>
                      <td>{rental.client}</td>
                      <td>{rental.vehicle}</td>
                      <td>{rental.dateStart}</td>
                      <td>{rental.dateEnd}</td>
                      <td>{rental.duration}</td>
                      <td>
                        <span className={`status-pill ${
                          rental.status === "terminé" ? "green" : 
                          rental.status === "en cours" ? "blue" : 
                          rental.status === "annulé" ? "red" : "yellow"
                        }`}>
                          {rental.status === "réservé" ? "réservé" : rental.status}
                        </span>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <select 
                          className="table-select"
                          value={rental.status}
                          onChange={(e) => handleRentalStatusChange(rental.id, e.target.value)}
                        >
                          <option value="réservé">Réservé</option>
                          <option value="en cours">En cours</option>
                          <option value="terminé">Terminé</option>
                          <option value="annulé">Annulé</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}

        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
