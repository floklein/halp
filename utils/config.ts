import { Platform } from "react-native";

export function getBaseURL() {
  if (process.env.NODE_ENV === "development" && Platform.OS !== "web") {
    return "http://192.168.1.56:8081";
  }
  return process.env.EXPO_SERVER_URL;
}
