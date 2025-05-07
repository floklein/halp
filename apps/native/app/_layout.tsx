import { FlipHorizontal, UserCircle } from "@tamagui/lucide-icons";
import { Link, Slot } from "expo-router";
import { useState } from "react";
import { StatusBar, useColorScheme } from "react-native";
import { Button, Form, H1, Input, Sheet, View, XStack, YStack } from "tamagui";
import Providers from "../components/Providers";

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
      <YStack height="100%">
        <XStack justify="center" py="$2">
          <H1 fontWeight="bold">HALP!</H1>
        </XStack>
        <View flex={1}>
          <Slot />
        </View>
        <XStack p="$2" gap="$2" items="center">
          <Link href="/" asChild>
            <Button flex={1} height="$6">
              <FlipHorizontal />
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
            <Button flex={1} height="$6">
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
        snapPoints={[90]}
      >
        <Sheet.Overlay
          animation="lazy"
          background="$shadow6"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
          opacity={0.9}
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
    </Providers>
  );
}
