import { expoClient } from "@better-auth/expo/client";
import { BetterAuthError } from "better-auth";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { getBaseURL } from "./config";

const secureStorage = {
  getItem: (key: string) => {
    if (Platform.OS !== "web") {
      return SecureStore.getItem(key);
    }
    return null;
  },
  setItem: (key: string, value: string) => {
    if (Platform.OS !== "web") {
      SecureStore.setItem(key, value);
    }
  },
};

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
  plugins: [
    expoClient({
      scheme: "halp",
      storagePrefix: "halp",
      storage: secureStorage,
    }),
  ],
});

export async function throwIfError<T>(
  promise: Promise<
    | {
        data: T;
      }
    | {
        error: BetterAuthError;
      }
  >,
): Promise<T> {
  const response = await promise;
  if ("error" in response) {
    throw response.error;
  }
  return response.data;
}
