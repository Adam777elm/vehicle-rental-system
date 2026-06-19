/**
 * aiResponses.js
 * Intelligent front-end response engine for the AA Motors AI Agent.
 * Analyzes query text and generates tailored, contextual answers.
 */

const RESPONSES = {
  greetings: {
    keywords: ["salut", "bonjour", "hello", "hi", "hey", "bonsoir", "aide"],
    reply: "Bonjour ! Je suis l'assistant IA de **AA Motors**. Je peux vous renseigner sur nos **Locations de motos**, nos **Trips organisés au Maroc**, notre **Marketplace d'occasion**, ou nos activités **Marine**. Que souhaitez-vous savoir ?"
  },
  rentals: {
    keywords: ["location", "louer", "prix", "tarif", "reserver", "moto", "dispo", "flotte"],
    reply: "Chez **AA Motors**, nous proposons une large gamme de motos à la location (TMAX, Tracer 9, Off-Road, etc.).\n\n- **Tarifs compétitifs** à la journée ou à la semaine.\n- **Équipements inclus** (casque, gants, antivol).\n- **Assurance tous risques** disponible.\n\n👉 Vous pouvez voir tous nos modèles disponibles et réserver directement sur notre page [Location & Trips](/location-trips)."
  },
  trips: {
    keywords: ["trip", "voyage", "circuit", "sahara", "atlas", "desert", "maroc", "guide", "tours"],
    reply: "Nous organisons des road-trips inoubliables guidés à travers le Maroc :\n\n1. **Désert du Sahara** (Dunes de Merzouga, bivouac sous les étoiles).\n2. **Traversée de l'Atlas** (Cols sinueux, montagnes majestueuses).\n3. **Trip Côtier** (Agadir, Essaouira, brise de l'océan).\n\n👉 Découvrez le programme complet, les dates et réservez votre pack sur la page [Location & Trips](/location-trips#trips) !"
  },
  marketplace: {
    keywords: ["marketplace", "occasion", "acheter", "vendre", "achat", "vente", "annonce", "publier"],
    reply: "Notre **Marketplace** vous permet d'acheter ou de vendre des motos d'occasion de prestige au Maroc.\n\n- **Achat sécurisé** : Parcourez les annonces vérifiées par notre équipe.\n- **Vente rapide** : Publiez votre propre annonce gratuitement en remplissant notre formulaire en ligne.\n\n👉 Rendez-vous sur notre [Marketplace](/marketplace) pour commencer !"
  },
  marine: {
    keywords: ["marine", "jet", "ski", "jetski", "mer", "bateau", "yamaha waverunner"],
    reply: "Envie de sensations fortes sur l'eau ? Notre département **Marine** propose :\n\n- Location de Jetskis de dernière génération (Yamaha FX, GP1800).\n- Randonnées guidées en mer.\n- Équipements de sécurité haut de gamme fournis.\n\n👉 Découvrez nos offres Marine sur la page [Marine](/marine)."
  },
  contact: {
    keywords: ["contact", "whatsapp", "tel", "telephone", "adresse", "bureau", "email", "mail"],
    reply: "Vous pouvez contacter l'équipe **AA Motors** directement par :\n\n- 💬 **WhatsApp** : [+212 774-593031](https://wa.me/212774593031)\n- 📍 **Adresse** : Casablanca / Marrakech, Maroc\n- ✉️ **E-mail** : contact@aamotors.ma\n\nN'hésitez pas à nous écrire, nous répondons en moins de 15 minutes !"
  },
  thanks: {
    keywords: ["merci", "thanks", "chokran", "parfait", "super", "cool"],
    reply: "Je vous en prie ! C'est un plaisir de vous aider. N'hésitez pas si vous avez d'autres questions sur AA Motors ! 🏍️💨"
  }
};

export const getAiResponse = (query) => {
  if (!query || query.trim() === "") {
    return "Veuillez saisir votre question pour que je puisse vous aider !";
  }

  const cleanQuery = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Scan through responses
  for (const key in RESPONSES) {
    const item = RESPONSES[key];
    for (const keyword of item.keywords) {
      if (cleanQuery.includes(keyword)) {
        return item.reply;
      }
    }
  }

  // Fallback default response
  return "Je ne suis pas sûr de bien comprendre votre demande. 🤷‍♂️\n\nJe peux vous aider concernant nos **locations**, nos **trips organisés**, notre **marketplace d'occasion**, ou comment nous **contacter**. Essayez d'utiliser des mots clés simples !";
};
