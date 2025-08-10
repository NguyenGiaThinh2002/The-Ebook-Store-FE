import axios from "axios";
import { getRegion } from "./region";

const instance = axios.create({
  // baseURL: "https://the-ebook-store-be.onrender.com",

  baseURL: "http://localhost:3000",
  // baseURL: "http://192.168.1.29:3000",
});

// Add region to every request as a **header**
instance.interceptors.request.use((config) => {
  const region = getRegion();
  config.headers["region"] = region;
  return config;
});

export default instance;
