import AskSheet from "@/components/AskSheet";
import CurrentToast from "@/components/CurrentToast";
import Providers from "@/components/Providers";
import { FlipHorizontal, UserCircle } from "@tamagui/lucide-icons";
import { ToastViewport } from "@tamagui/toast";
import { Link, Stack } from "expo-router";
import { useState } from "react";
import { StatusBar, useColorScheme } from "react-native";
import { Button, H1, View, XStack, YStack } from "tamagui";

export default function Layout() {
  const colorScheme = useColorScheme();

  const [newOpen, setNewOpen] = useState(false);

  function openNew() {
    setNewOpen(true);
  }

  return (
    <Providers>
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />
      <View flex={1}>
        <XStack justify="center" py="$2">
          <H1 fontWeight="bold">HALP!</H1>
        </XStack>
        <YStack flex={1}>
          <View flex={1}>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="account" />
            </Stack>
          </View>
          <XStack items="flex-end" pt="$2">
            <Link href="/" asChild>
              <Button flex={1} height="$6" chromeless rounded="$0">
                <FlipHorizontal size="$2" />
              </Button>
            </Link>
            <Button
              onPress={openNew}
              height="$7"
              width="$7"
              themeInverse
              fontSize="$8"
              fontWeight="bold"
              px="$0"
            >
              ask
            </Button>
            <Link href="/account" asChild>
              <Button flex={1} height="$6" chromeless rounded="$0">
                <UserCircle size="$2" />
              </Button>
            </Link>
          </XStack>
        </YStack>
        <AskSheet open={newOpen} setOpen={setNewOpen} />
        <CurrentToast />
        <ToastViewport width="100%" />
      </View>
    </Providers>
  );
}
