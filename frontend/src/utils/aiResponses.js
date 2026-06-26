import API from "../services/api";

export const getAiResponse = async (query, history) => {
  if (!query || query.trim() === "") {
    return "Veuillez saisir votre question pour que je puisse vous aider !";
  }

  try {
    const response = await API.post("/chat", { query, history });
    return response.data.reply || "Désolé, je n'ai pas pu obtenir de réponse.";
  } catch (error) {
    console.error("Erreur de connexion avec l'API de chat:", error);
    
    // Friendly fallback error message for network/server failures
    return "Désolé, une erreur de connexion réseau est survenue avec notre serveur d'IA. Veuillez vérifier que le serveur backend tourne correctement.";
  }
};

