/**
 * getAvailableColors(bike)
 * Returns an array of { name, value (hex), image? } for a given bike object.
 * Used by VehicleCard and MotoDetail pages.
 */
export function getAvailableColors(bike) {
  const name = (bike.name || "").toLowerCase();
  const category = (bike.category || "").toLowerCase();

  // ── Supersport ─────────────────────────────────────────────────────────────
  if (name === "r1m") return [
    { name: "Icon Performance (Carbone/Bleu)", value: "#1e293b",
      image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2024/YZF1000R1SPL/2024-Yamaha-YZF1000R1SPL-EU-Icon_Performance-360-Degrees-001-03_Mobile.jpg" }
  ];
  if (name === "r1") return [
    { name: "Icon Blue (Bleu Racing)", value: "#004b87",
      image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2024/YZF1000R1/2024-Yamaha-YZF1000R1-EU-Icon_Blue-360-Degrees-001-03_Mobile.jpg" },
    { name: "Tech Black (Noir Satiné)", value: "#111111",
      image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2025/YZF1000R1COMP/2025-Yamaha-YZF1000R1COMP-EU-Tech_Black-360-Degrees-001-03.jpg" }
  ];
  if (name === "r9") return [
    { name: "Icon Blue (Bleu Racing)", value: "#004b87",
      image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2026/YZF900R9/2026-Yamaha-YZF900R9-EU-Icon_Blue-360-Degrees-001-03_Mobile.jpg" },
    { name: "Tech Black (Noir Satiné)", value: "#111111",
      image: "https://mifa-motors.ma/wp-content/uploads/2025/07/2025-Yamaha-YZF900R9-EU-Tech_Black-360-Degrees-001-03.jpg" }
  ];
  if (name === "r7") return [
    { name: "Icon Blue (Bleu Racing)", value: "#004b87",
      image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2024/YZF700R7/2024-Yamaha-YZF700R7-EU-Icon_Blue-Studio-001-03.jpg" },
    { name: "Tech Black (Noir Satiné)", value: "#111111",
      image: "https://mifa-motors.ma/wp-content/uploads/2023/04/2024-Yamaha-YZF700R7-EU-Midnight_Black-Studio-001-03.jpg" }
  ];

  // ── Roadster / MT ───────────────────────────────────────────────────────────
  if (name === "mt-10 sp" || name === "mt-09 sp") return [
    { name: "Icon Performance (Carbone/Bleu)", value: "#1e293b" }
  ];
  if (name === "mt-10") return [
    { name: "Icon Blue (Bleu Racing)", value: "#004b87",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgFvWn5_FohD-TWwpCp6Ie4iIuD4XvbtocMXY6FE6MmQ&s=10" },
    { name: "Ice Storm (Gris/Rouge)", value: "#e2e8f0" }
  ];
  if (name === "mt-09") return [
    { name: "Tech Black (Noir Satiné)", value: "#111111" },
    { name: "Ice Storm (Gris/Rouge)", value: "#e2e8f0",
      image: "https://mifa-motors.ma/wp-content/uploads/2021/04/2025-Yamaha-MT09A-35-EU-Ice_Storm-Studio-001-03-2.jpg" }
  ];
  if (name === "mt-07") return [
    { name: "Tech Black (Noir Satiné)", value: "#111111" },
    { name: "Ice Storm (Gris/Rouge)", value: "#e2e8f0",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN-G3x4wdhKyONWgDSWrLnrnrrqquVPoyZGTJukCRd7Q&s=10" }
  ];
  if (name === "mt-125") return [
    { name: "Tech Black (Noir Satiné)", value: "#111111" }
  ];
  if (name.includes("mt-") || category.includes("roadster")) return [
    { name: "Icon Blue (Bleu Racing)", value: "#004b87" },
    { name: "Tech Black (Noir Satiné)", value: "#111111" },
    { name: "Midnight Cyan (Turquoise Fluo)", value: "#00a3a6" }
  ];

  // ── Sport Touring / Tracer ──────────────────────────────────────────────────
  if (name.includes("tracer") || category.includes("sport touring") || category.includes("touring")) return [
    { name: "Redline (Rouge Racing)", value: "#d62229" },
    { name: "Tech Black (Noir Métallisé)", value: "#111111" },
    { name: "Ceramic Ice (Gris Givré)", value: "#cbd5e1" }
  ];

  // ── Off Road / Adventure ────────────────────────────────────────────────────
  if (name === "ténéré 700") return [
    { name: "Icon Blue (Bleu Racing)", value: "#004b87",
      image: "https://mifa-motors.ma/wp-content/uploads/2026/05/6052_2.jpg" },
    { name: "Classic Sahara (Sable Rallye)", value: "#c2b280",
      image: "https://mifa-motors.ma/wp-content/uploads/2026/05/6052_1.jpg" }
  ];
  if (name.includes("grizzly")) return [
    { name: "Tactical Grey (Gris Tactique)", value: "#525a66" }
  ];
  if (name.includes("kodiak")) return [
    { name: "Military Green (Vert Militaire)", value: "#424d3b" }
  ];
  if (name.includes("raptor 700") || name.includes("raptor 110")) return [
    { name: "Icon Blue (Bleu Racing)", value: "#004b87" }
  ];
  if (name.includes("raptor 450")) return [
    { name: "Limited Tiffany Black (Noir/Tiffany)", value: "#0abab5" }
  ];
  if (category === "motocross" || category === "enduro" || name.includes("yz") || name.includes("wr")) return [
    { name: "Icon Blue (Bleu Racing)", value: "#004b87" }
  ];
  if (name.includes("ténéré") || category.includes("adventure") || category.includes("off road")) return [
    { name: "Icon Blue (Bleu Racing)", value: "#004b87" },
    { name: "Classic Sahara (Sable Rallye)", value: "#c2b280" },
    { name: "Tech Black (Noir Mat)", value: "#111111" }
  ];

  // ── Scooters ────────────────────────────────────────────────────────────────
  if (name.includes("tmax") || name.includes("xmax") || name.includes("nmax") || category.includes("scooter")) return [
    { name: "Dark Petrol (Vert Pétrole)", value: "#1f2e2e" },
    { name: "Tech Black (Noir Mat)", value: "#111111" },
    { name: "Icon Grey (Gris Nardo)", value: "#8e939f" }
  ];

  // ── Marine / Waverunner ─────────────────────────────────────────────────────
  if (name.includes("gp1800r svho")) return [
    { name: "Diamond Bleu", value: "#0b5fa5",
      image: "https://invisionartworks.com/cdn/shop/files/DMSKGGP180021-ACNT-BL_Install_2000x.jpg?v=1745945059" },
    { name: "Noir Étoilé", value: "#1a1a1a",
      image: "https://invisionartworks.com/cdn/shop/files/DMSKGGP180021-ACNT-BK_Install_2000x.jpg?v=1745945360" }
  ];
  if (name.includes("superjet")) return [
    { name: "White Coat (Blanc)", value: "#f8f9fa",
      image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2023/SJ1050/2023-Yamaha-SJ1050-EU-White_Coat-Studio-001-03.jpg" }
  ];
  if (name.includes("fx cruiser svho") || name.includes("fx svho")) return [
    { name: "Noir Gold", value: "#2b261b",
      image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2026/FXLTDSVHO/2026-Yamaha-FXLTDSVHO-EU-Black-Studio-001-03_Mobile.jpg" },
    { name: "Sea Icone", value: "#3fb0ac",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNSfRtrPtSOJ8MwrlBJhoV41wBTBOP9gQaQwDnm0-Shw&s=10" }
  ];
  if (name === "vx cruiser ho") return [
    { name: "Ocean Blue (Dusty Blue)", value: "#1a6b9a",
      image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2025/VXCRUISERHO/2025-Yamaha-VXCRUISERHO-EU-Dusty_Blue-Studio-001-03-1.jpg" }
  ];
  if (name.includes("vx cruiser 2026")) return [
    { name: "Rouge Passion", value: "#C0392B",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdGd_epqplwR3H4RuVBFoKDsx-wji-80YVh8-CRePX7w&s=10" }
  ];
  if (name.includes("vx deluxe")) return [
    { name: "Red Limited", value: "#C0392B",
      image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2026/VXDELUXE/2026-Yamaha-VXDELUXE-EU-Black___Torch_Red-Studio-001-03.jpg" },
    { name: "Bleu Fluo", value: "#0050FF",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYzdLSb6v281grqKOBs48wkgh-J7Km5TPhM3MHs0WPNA&s=10" }
  ];
  if (category.includes("marine") || name.includes("cruiser") || name.includes("superjet") || name.includes("boat")) return [
    { name: "Cyan Metallic (Bleu Lagon)", value: "#00a8cc" },
    { name: "Competition White (Blanc Racing)", value: "#f3f4f6" },
    { name: "Carbon Tech (Gris/Noir Sport)", value: "#2d3748" }
  ];

  // ── Default ─────────────────────────────────────────────────────────────────
  return [
    { name: "Icon Blue (Bleu)", value: "#004b87" },
    { name: "Tech Black (Noir)", value: "#111111" },
    { name: "Competition White (Blanc)", value: "#f3f4f6" }
  ];
}
