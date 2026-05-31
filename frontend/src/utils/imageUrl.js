export function getApiBase() {
  const isProduction = window.location.hostname.includes("vercel.app");
  return isProduction
    ? "https://vehicle-rental-system-y8jx.onrender.com"
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
