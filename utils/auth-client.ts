import { expoClient } from "@better-auth/expo/client";
import { createAuthClient } from "better-auth/react";
import SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
  baseURL: "http://localhost:8081",
  plugins: [
    expoClient({
      scheme: "halp",
      storagePrefix: "halp",
      storage: SecureStore,
    }),
  ],
});
