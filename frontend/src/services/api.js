import axios from "axios";

// Use the current hostname dynamically to allow local network access (e.g. from mobile phones)
const API = axios.create({
  baseURL: `http://${window.location.hostname}:5000/api`,
});

export default API;