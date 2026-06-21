/**
 * aiResponses.js
 * Asynchronous front-end response engine for the AA Motors AI Agent.
 * Fetches intelligent responses from the backend LLM endpoint securely.
 */

// Dynamically use the environment variable for deployment, or fallback to local hostname port 5000
const API_URL = process.env.REACT_APP_API_URL || `http://${window.location.hostname}:5000/api`;

export const getAiResponse = async (query, history) => {
  if (!query || query.trim() === "") {
    return "Veuillez saisir votre question pour que je puisse vous aider !";
  }

  try {
    const response = await fetch(`${API_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, history }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.reply || "Désolé, je n'ai pas pu obtenir de réponse.";
  } catch (error) {
    console.error("Erreur de connexion avec l'API de chat:", error);
    
    // Friendly fallback error message for network/server failures
    return "Désolé, une erreur de connexion réseau est survenue avec notre serveur d'IA. Veuillez vérifier que le serveur backend tourne correctement.";
  }
};
