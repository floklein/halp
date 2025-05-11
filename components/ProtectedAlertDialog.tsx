import { Link } from "expo-router";
import React, { ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogProps,
  Button,
  View,
  XStack,
  YStack,
} from "tamagui";

export default function ProtectedAlertDialog({
  button,
  ...props
}: AlertDialogProps & {
  button?: ReactNode;
}) {
  return (
    <AlertDialog native {...props}>
      <AlertDialog.Trigger asChild>{button}</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <AlertDialog.Content
          bordered
          elevate
          key="content"
          animation={["quick", { opacity: { overshootClamping: true } }]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          x={0}
          scale={1}
          opacity={1}
          y={0}
        >
          <YStack gap="$4">
            <View>
              <AlertDialog.Title>hey!</AlertDialog.Title>
              <AlertDialog.Description>
                you need an account to do that
              </AlertDialog.Description>
            </View>
            <XStack gap="$3" justify="flex-end">
              <AlertDialog.Cancel asChild>
                <Button>cancel</Button>
              </AlertDialog.Cancel>
              <Link href="/account/signup">
                <AlertDialog.Action asChild>
                  <Button theme="accent">sign up</Button>
                </AlertDialog.Action>
              </Link>
            </XStack>
          </YStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  );
}
