import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { FlipHorizontal, UserCircle } from "@tamagui/lucide-icons";
import { useFonts } from "expo-font";
import { Link, Slot, SplashScreen } from "expo-router";
import { useEffect, useState } from "react";
import { StatusBar, useColorScheme } from "react-native";
import {
  Button,
  Form,
  H1,
  Input,
  Sheet,
  TamaguiProvider,
  View,
  XStack,
  YStack,
} from "tamagui";
import { tamaguiConfig } from "../tamagui.config";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  const [newOpen, setNewOpen] = useState(false);

  function openNew() {
    setNewOpen(true);
  }

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme!}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <StatusBar
          barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        />
        <YStack height="100%">
          <XStack justify="center" py="$2">
            <H1>HALP!</H1>
          </XStack>
          <View flex={1}>
            <Slot />
          </View>
          <XStack height="$8" p="$2" gap="$2">
            <Link href="/" asChild>
              <Button flex={1} height="100%">
                <FlipHorizontal />
              </Button>
            </Link>
            <Button
              onPress={openNew}
              height="100%"
              width="$8"
              bg="tomato"
              fontSize="$8"
              fontWeight="bold"
              px="$0"
            >
              ASK
            </Button>
            <Link href="/account" asChild>
              <Button flex={1} height="100%">
                <UserCircle />
              </Button>
            </Link>
          </XStack>
        </YStack>
        <Sheet
          open={newOpen}
          onOpenChange={setNewOpen}
          forceRemoveScrollEnabled={newOpen}
          dismissOnSnapToBottom
          animation="bouncy"
          snapPoints={[95]}
        >
          <Sheet.Overlay
            animation="lazy"
            background="$shadow6"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
          <Sheet.Handle />
          <Sheet.Frame p="$8">
            <Form>
              <YStack gap="$8">
                <Input placeholder="What do you want to ask?" />
                <XStack gap="$4">
                  <Input placeholder="Left choice" flex={1} />
                  <Input placeholder="Right choice" flex={1} />
                </XStack>
                <Form.Trigger asChild>
                  <Button>Submit</Button>
                </Form.Trigger>
              </YStack>
            </Form>
          </Sheet.Frame>
        </Sheet>
      </ThemeProvider>
    </TamaguiProvider>
  );
}
