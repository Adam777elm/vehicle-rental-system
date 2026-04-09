import axios from "axios";

const isProduction = window.location.hostname.includes("vercel.app");

const API = axios.create({
  baseURL: isProduction 
    ? "https://vehicle-rental-system-y8jx.onrender.com/api" 
    : `http://${window.location.hostname}:5000/api`,
});

export default API;