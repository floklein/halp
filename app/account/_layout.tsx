import { authClient } from "@/utils/auth-client";
import { Stack } from "expo-router";

export default function Layout() {
  const isLoggedIn = !!authClient.useSession().data;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="index" />
      </Stack.Protected>
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="signup" />
        <Stack.Screen name="login" />
      </Stack.Protected>
    </Stack>
  );
}
