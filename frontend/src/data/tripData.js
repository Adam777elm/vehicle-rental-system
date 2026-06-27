import packImg from "../assets/TRIPS_IMG/pack-decouverte.png";
import coastImg from "../assets/TRIPS_IMG/trips-coast.png";
import desertImg from "../assets/TRIPS_IMG/trips-desert.png";
import tripsHeroImg from "../assets/TRIPS_IMG/trips-hero.png";
import rabatIvoireImg from "../assets/TRIPS_IMG/rabat_ivoire.png";
import tangerAnkaraImg from "../assets/TRIPS_IMG/tanger_ankara.png";
import nadorComoImg from "../assets/TRIPS_IMG/nador_como.png";

export const tripPackages = [
  {
    id: 1,
    tag: "AVENTURE",
    title: "Route de l'Atlas",
    desc: "Traversée épique des cols de l'Atlas avec des paysages à couper le souffle. Routes sinueuses et panoramas grandioses.",
    image: tripsHeroImg,
    duration: "5 jours",
    price: 4500,
    km: "1 200 km",
    pauses: 15,
    tempsTotal: "35 heures de conduite",
    gallery: [tripsHeroImg, desertImg, packImg],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1726058.452033878!2d-8.898845688535306!3d31.547196656711516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafee8d961f65bb%3A0xc6fb57dc320623a3!2sAtlas%20Mountains!5e0!3m2!1sen!2sma!4v1700000000000!5m2!1sen!2sma",
    itinerary: [
      { day: "Jour 1", title: "Départ de Marrakech", details: "Prise en main des motos et départ vers Asni. Traversée des premiers contreforts et nuit dans un auberge traditionnelle." },
      { day: "Jour 2", title: "Col du Tizi n'Test", details: "Ascension mythique du col à 2100m. Virages serrés et vues imprenables sur la vallée du Souss. Nuit à Taroudant." },
      { day: "Jour 3", title: "Vers Ouarzazate", details: "Route à travers l'Anti-Atlas, paysages rocailleux et kasbahs historiques. Arrivée à Ouarzazate en fin de journée." },
      { day: "Jour 4", title: "Vallée du Dadès", details: "Découverte des gorges du Dadès. Conduite sur des routes en lacets spectaculaires avec des falaises rouges." },
      { day: "Jour 5", title: "Retour par le Tizi n'Tichka", details: "Passage par le célèbre col du Tizi n'Tichka (2260m) et retour triomphal à Marrakech. Restitution des motos." }
    ]
  },
  {
    id: 2,
    tag: "CÔTE ATLANTIQUE",
    title: "Essaouira Ride",
    desc: "Longez la côte atlantique marocaine, d'Agadir à Essaouira. Falaises, plages sauvages et villages de pêcheurs.",
    image: coastImg,
    duration: "3 jours",
    price: 2800,
    km: "450 km",
    pauses: 8,
    tempsTotal: "12 heures de conduite",
    gallery: [coastImg, tripsHeroImg, packImg],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d431057.9947849646!2d-10.158582236355818!3d31.066068228120042!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdb36e7885b5d84d%3A0x8ba6e8d2e8b2ed6!2sEssaouira!5e0!3m2!1sen!2sma!4v1700000000000!5m2!1sen!2sma",
    itinerary: [
      { day: "Jour 1", title: "Départ d'Agadir", details: "Longez la côte par Taghazout et Imsouane. Arrêts sur les spots de surf et déjeuner poisson grillé." },
      { day: "Jour 2", title: "Arrivée à Essaouira", details: "Route sinueuse entre les arganiers. Visite de la médina, des remparts et nuit dans un riad vue mer." },
      { day: "Jour 3", title: "Retour par les terres", details: "Traversée de paysages ruraux et forêts d'arganiers pour un retour tranquille vers Agadir." }
    ]
  },
  {
    id: 3,
    tag: "DÉSERT",
    title: "Sahara Express",
    desc: "Aventure dans les dunes de Merzouga. Bivouac sous les étoiles et traversée de paysages lunaires inoubliables.",
    image: desertImg,
    duration: "4 jours",
    price: 5200,
    km: "950 km",
    pauses: 12,
    tempsTotal: "24 heures de conduite",
    gallery: [desertImg, tripsHeroImg, packImg],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1726058.452033878!2d-5.898845688535306!3d31.547196656711516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd9c20a455a2977f%3A0x6cfb57dc320623a3!2sMerzouga!5e0!3m2!1sen!2sma!4v1700000000000!5m2!1sen!2sma",
    itinerary: [
      { day: "Jour 1", title: "Traversée de l'Atlas", details: "Départ de Fès, traversée de la forêt de cèdres d'Azrou, pause avec les macaques. Nuit à Midelt." },
      { day: "Jour 2", title: "Gorges du Ziz", details: "Descente spectaculaire le long de la vallée du Ziz, arrivée à Erfoud puis Merzouga. Bivouac de luxe." },
      { day: "Jour 3", title: "Conduite sur Sable", details: "Session d'initiation au franchissement de dunes légères autour de l'Erg Chebbi." },
      { day: "Jour 4", title: "Retour", details: "Lever de soleil sur les dunes et longue chevauchée de retour vers le nord." }
    ]
  },
  {
    id: 4,
    tag: "TRANS-AFRICAINE",
    title: "Rabat - Côte d'Ivoire",
    desc: "Un road trip épique à travers le continent africain. Découvrez des paysages grandioses de la savane jusqu'à la côte ivoirienne.",
    image: rabatIvoireImg,
    duration: "14 jours",
    price: 15000,
    km: "4 200 km",
    pauses: 45,
    tempsTotal: "110 heures de conduite",
    gallery: [rabatIvoireImg, desertImg, tripsHeroImg],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7943568.452033878!2d-10.898845688535306!3d20.547196656711516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdbf9a455a2977f%3A0x7cfb57dc320623a3!2sAbidjan!5e0!3m2!1sen!2sma!4v1700000000000!5m2!1sen!2sma",
    itinerary: [
      { day: "Jours 1-3", title: "Traversée du Maroc Profond", details: "Descente vers Dakhla avec des paysages désertiques à perte de vue." },
      { day: "Jours 4-6", title: "Mauritanie", details: "Passage de la frontière, pistes sablonneuses et arrivée à Nouakchott." },
      { day: "Jours 7-9", title: "Sénégal & Mali", details: "Changement radical de décor : savane, baobabs et terres ocres. Bivouacs sauvages." },
      { day: "Jours 10-14", title: "Arrivée en Côte d'Ivoire", details: "Traversée de la jungle dense, rencontre avec les communautés locales et arrivée finale à Abidjan." }
    ]
  },
  {
    id: 5,
    tag: "EURO-ASIE",
    title: "Tanger - Ankara",
    desc: "Une chevauchée mythique traversant la Méditerranée jusqu'aux terres grandioses de l'Anatolie.",
    image: tangerAnkaraImg,
    duration: "21 jours",
    price: 22500,
    km: "6 500 km",
    pauses: 65,
    tempsTotal: "175 heures de conduite",
    gallery: [tangerAnkaraImg, coastImg, tripsHeroImg],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15943568.452033878!2d15.898845688535306!3d40.547196656711516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d34a455a2977f%3A0x1cfb57dc320623a3!2sAnkara!5e0!3m2!1sen!2sma!4v1700000000000!5m2!1sen!2sma",
    itinerary: [
      { day: "Jours 1-5", title: "Espagne & Sud de la France", details: "Ferry depuis Tanger. Route de la côte méditerranéenne en passant par la Costa del Sol et la Provence." },
      { day: "Jours 6-10", title: "Italie & Balkans", details: "Traversée des Alpes italiennes, descente par la côte adriatique, paysages spectaculaires en Croatie et Monténégro." },
      { day: "Jours 11-15", title: "Grèce & Entrée en Asie", details: "Les routes mythiques du Péloponnèse, Athènes, puis traversée du détroit du Bosphore à Istanbul." },
      { day: "Jours 16-21", title: "L'Anatolie", details: "Traversée des vastes plaines turques, visite de la Cappadoce et arrivée finale à Ankara." }
    ]
  },
  {
    id: 6,
    tag: "DOLCE VITA",
    title: "Nador - Lac de Côme",
    desc: "De la côte méditerranéenne aux majestueux paysages italiens. Conduite sur les routes mythiques autour du Lac de Côme.",
    image: nadorComoImg,
    duration: "10 jours",
    price: 12000,
    km: "2 800 km",
    pauses: 30,
    tempsTotal: "70 heures de conduite",
    gallery: [nadorComoImg, coastImg, tripsHeroImg],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31943568.452033878!2d5.898845688535306!3d45.547196656711516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47841a455a2977f%3A0x4cfb57dc320623a3!2sLake%20Como!5e0!3m2!1sen!2sma!4v1700000000000!5m2!1sen!2sma",
    itinerary: [
      { day: "Jours 1-2", title: "Nador à Barcelone", details: "Ferry jusqu'en Espagne. Route scénique via la Costa Brava, arrêts tapas et vue mer." },
      { day: "Jours 3-5", title: "Côte d'Azur", details: "Les routes de la corniche française, Monaco et l'entrée majestueuse en Italie via Sanremo." },
      { day: "Jours 6-8", title: "Les Grands Lacs", details: "Arrivée en Lombardie, routes sinueuses bordant le lac Majeur et le lac de Côme." },
      { day: "Jours 9-10", title: "Le Col du Stelvio", details: "Pour clôturer, ascension du mythique col aux 48 virages en épingle avant le retour." }
    ]
  }
];
