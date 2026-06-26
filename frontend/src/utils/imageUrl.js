export function getApiBase() {
  const isLocal = 
    window.location.hostname === "localhost" || 
    window.location.hostname === "127.0.0.1" || 
    window.location.hostname.startsWith("192.168.") || 
    window.location.hostname.startsWith("10.") ||
    window.location.hostname.startsWith("172.");
  
  const isProduction = !isLocal;
  return isProduction
    ? "https://vehicle-rental-system-yeka.onrender.com"
    : `http://${window.location.hostname}:5000`;
}

export function getUploadUrl(filename) {
  if (!filename) return "";
  if (filename.startsWith("http")) return filename;
  return `${getApiBase()}/uploads/${filename}`;
}

export function resolveVehicleImage(image) {
  if (!image) return "";
  if (image.startsWith("http")) return image;
  return getUploadUrl(image);
}
