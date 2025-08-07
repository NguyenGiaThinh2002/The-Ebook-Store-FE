const REGION_KEY = "user-region";

export function setRegion(region) {
  localStorage.setItem(REGION_KEY, region);
}

export function getRegion() {
  return localStorage.getItem(REGION_KEY) || "japan";
}
