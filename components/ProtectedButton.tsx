import { authClient } from "@/utils/auth-client";
import { Link } from "expo-router";
import {
  AlertDialog,
  Button,
  ButtonProps,
  View,
  XStack,
  YStack,
} from "tamagui";

export default function ProtectedButton(props: ButtonProps) {
  const { data: session } = authClient.useSession();

  if (session) {
    return <Button {...props} />;
  }
  const { onPress, ...rest } = props;
  return (
    <AlertDialog native>
      <AlertDialog.Trigger asChild>
        <Button {...rest} />
      </AlertDialog.Trigger>
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
