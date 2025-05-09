import { expoClient } from "@better-auth/expo/client";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";

const secureStorage = {
  getItem: (key: string) => {
    if (typeof window === "undefined") {
      return SecureStore.getItem(key);
    }
    return null;
  },
  setItem: (key: string, value: string) => {
    if (typeof window === "undefined") {
      SecureStore.setItem(key, value);
    }
  },
};

export const authClient = createAuthClient({
  baseURL: "http://localhost:8081",
  plugins: [
    expoClient({
      scheme: "halp",
      storagePrefix: "halp",
      storage: secureStorage,
    }),
  ],
});
