import CurrentToast from "@/components/CurrentToast";
import Providers from "@/components/Providers";
import { FlipHorizontal, UserCircle } from "@tamagui/lucide-icons";
import { ToastViewport } from "@tamagui/toast";
import { Link, Stack } from "expo-router";
import React from "react";
import { Platform, StatusBar, useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, H1, useTheme, View, XStack, YStack } from "tamagui";

function LayoutWithinProviders() {
  const colorScheme = useColorScheme();
  const theme = useTheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.background.val }}>
        <StatusBar
          barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        />
        <YStack flex={1}>
          <XStack justify="center" py="$2">
            <H1 fontWeight="bold">HALP!</H1>
          </XStack>
          <View flex={1} style={{ zIndex: 1 }}>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" options={{ animation: "none" }} />
              <Stack.Screen
                name="ask"
                options={{
                  headerShown: Platform.OS !== "web",
                  presentation: "modal",
                }}
              />
              <Stack.Screen name="account" options={{ animation: "none" }} />
            </Stack>
          </View>
          <XStack items="flex-end" pt="$2" z={2}>
            <Link href="/" asChild replace>
              <Button flex={1} height="$6" rounded="$0" chromeless>
                <FlipHorizontal size="$2" />
              </Button>
            </Link>
            <Link href="/ask" asChild>
              <Button
                height="$7"
                width="$7"
                theme="accent"
                fontSize="$8"
                fontWeight="bold"
                px="$0"
              >
                ask
              </Button>
            </Link>
            <Link href="/account" asChild replace>
              <Button flex={1} height="$6" rounded="$0" chromeless>
                <UserCircle size="$2" />
              </Button>
            </Link>
          </XStack>
          <CurrentToast />
          <ToastViewport width="100%" />
        </YStack>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

export default function Layout() {
  return (
    <Providers>
      <LayoutWithinProviders />
    </Providers>
  );
}
