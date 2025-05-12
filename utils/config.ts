import { Platform } from "react-native";

export function getBaseURL() {
  return Platform.OS !== "web"
    ? "http://192.168.1.56:8081"
    : "http://localhost:8081";
}
