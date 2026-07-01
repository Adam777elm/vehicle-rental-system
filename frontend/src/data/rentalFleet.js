import imgMT07 from "../assets/ROADSTER-IMG/2025-Yamaha-MT07AS-EU-Tech_Black-360-Degrees-001-03.jpg";

/** Catalogue location AA Motors — Modèles Yamaha autorisés */
export const RENTAL_FLEET = [
  {
    id: "rent-mt-07",
    name: "MT-07",
    category: "Roadster",
    description:
      "Roadster léger au couple généreux. La référence pour une location moto fun et accessible à tous.",
    pricePerDay: 900,
    image: "https://moto-nautika.com/wp-content/uploads/2024/10/Yamaha-MT-07.jpg",
    features: ["689 cm³ CP2", "ABS", "Assurance incluse", "200 km/jour"],
  },
  {
    id: "rent-r7",
    name: "YZF-R7",
    category: "Supersport",
    description:
      "Sportive accessible à la prise en main rapide. Carénage racing et position agressive pour les amateurs de vitesse.",
    pricePerDay: 1100,
    image:
      "https://cdn2.yamaha-motor.eu/prod/product-assets/2024/YZF700R7/2024-Yamaha-YZF700R7-EU-Icon_Blue-Studio-001-03.jpg",
    features: ["689 cm³ CP2", "Embrayage A&S", "ABS double canal", "Position piste"],
    badge: "SPORT",
  },
  {
    id: "rent-tracer-9",
    name: "TRACER 9",
    category: "Sport Touring",
    description:
      "Pour les longues distances : confort, protection et moteur CP3 pour vos road trips les plus ambitieux.",
    pricePerDay: 1100,
    image:
      "https://cdn2.yamaha-motor.eu/prod/product-assets/2025/MT09ATR/2025-Yamaha-MT09ATR-EU-Redline-360-Degrees-001-03_Mobile.jpg",
    features: ["890 cm³", "Bulles réglables", "Valises option", "Support GPS"],
  },
  {
    id: "rent-tracer-7-gt",
    name: "TRACER 7 GT",
    category: "Sport Touring",
    description:
      "Valises, bulle haute touring et selle confort de série. Idéale pour découvrir la région en toute autonomie.",
    pricePerDay: 950,
    image:
      "https://cdn2.yamaha-motor.eu/prod/product-assets/2026/MT07TRGTS/2026-Yamaha-MT07TRGTS-EU-Icon_Performance-360-Degrees-001-03_Mobile.jpg",
    features: ["689 cm³ CP2", "Valises latérales", "Bulle touring", "Selle confort"],
  },
  {
    id: "rent-tenere-700",
    name: "Ténéré 700",
    category: "Adventure",
    description:
      "Trail polyvalent pour routes et pistes. L'aventure en location sans compromis, accessible dès le permis A.",
    pricePerDay: 1050,
    image:
      "https://cdn2.yamaha-motor.eu/prod/product-assets/2024/XTZ700D/2024-Yamaha-XTZ700D-EU-Icon_Blue-360-Degrees-001-03_Mobile.jpg",
    features: ["689 cm³", "ABS 3 modes", "Protection off-road", "Caution remboursable"],
  },
  {
    id: "rent-tmax-560",
    name: "TMAX 560",
    category: "Scooter",
    description:
      "Le roi du maxi-scooter. Idéal pour explorer la ville et les routes côtières avec confort et puissance absolus.",
    pricePerDay: 1200,
    image:
      "https://cdn2.yamaha-motor.eu/prod/product-assets/2026/XP500A/2026-Yamaha-XP500A-EU-Icon_Blue-360-Degrees-001-03_Mobile.jpg",
    features: ["561 cm³", "Transmission auto", "ABS", "Top case dispo"],
    badge: "PREMIUM",
  },
  {
    id: "rent-nmax-125",
    name: "NMAX 125",
    category: "Scooter",
    description:
      "Scooter urbain économique et moderne. La solution idéale pour la ville, les courtes durées et les débutants.",
    pricePerDay: 450,
    image:
      "https://cdn2.yamaha-motor.eu/prod/product-assets/2026/G125YM/2026-Yamaha-G125YM-EU-Icon_Blue-360-Degrees-001-03_Mobile.jpg",
    features: ["125 cm³", "Faible conso", "Coffre sous selle", "Idéal débutant"],
  },
];

export const RENTAL_CATEGORIES = ["Tous", "Roadster", "Supersport", "Sport Touring", "Adventure", "Scooter"];

export function formatPricePerDay(amount) {
  return `${Number(amount).toLocaleString("fr-FR")} DHS / jour`;
}

export function mergeWithDbVehicles(staticFleet, dbVehicles) {
  const rentFromDb = dbVehicles.filter((v) => v.type === "rent");

  const merged = staticFleet.map((item) => {
    const match = rentFromDb.find(
      (d) =>
        d.name.toLowerCase().includes(item.name.toLowerCase()) ||
        item.name.toLowerCase().includes(d.name.toLowerCase())
    );
    if (!match) return { ...item, mongoId: null };
    return {
      ...item,
      mongoId: match._id,
      pricePerDay: match.price ?? item.pricePerDay,
      image: (match.image && !match.image.includes("yamaha-motor.eu")) ? match.image : item.image,
      description: match.description || item.description,
      availability: match.availability !== false,
    };
  });

  rentFromDb.forEach((db) => {
    const already = merged.some(
      (m) =>
        m.mongoId === db._id ||
        m.name.toLowerCase() === db.name.toLowerCase()
    );
    if (!already) {
      merged.push({
        id: db._id,
        mongoId: db._id,
        name: db.name,
        category: db.category,
        description: db.description || "Véhicule disponible à la location.",
        pricePerDay: db.price,
        image: db.image,
        features: [],
        fromDb: true,
        availability: db.availability !== false,
      });
    }
  });

  return merged;
}
