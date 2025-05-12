import { authClient } from "@/utils/auth-client";
import { Stack } from "expo-router";

export default function Layout() {
  const isSignedIn = !!authClient.useSession().data;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isSignedIn}>
        <Stack.Screen name="index" />
      </Stack.Protected>
      <Stack.Protected guard={!isSignedIn}>
        <Stack.Screen name="signup" />
        <Stack.Screen name="signin" />
      </Stack.Protected>
    </Stack>
  );
}
