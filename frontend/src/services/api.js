import axios from "axios";

const isLocal = 
  window.location.hostname === "localhost" || 
  window.location.hostname === "127.0.0.1" || 
  window.location.hostname.startsWith("192.168.") || 
  window.location.hostname.startsWith("10.") ||
  window.location.hostname.startsWith("172.");

const isProduction = !isLocal;

const API = axios.create({
  baseURL: isProduction 
    ? "https://vehicle-rental-system-y8jx.onrender.com/api" 
    : `http://${window.location.hostname}:5000/api`,
});

export default API;