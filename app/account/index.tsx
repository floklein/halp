import { authClient, throwIfError } from "@/utils/auth-client";
import { useMutation } from "@tanstack/react-query";
import { Button, H2, YStack } from "tamagui";

export default function Account() {
  const { data: session } = authClient.useSession();

  const { mutate: signOut, isPending: isSigningOut } = useMutation({
    mutationFn: () => throwIfError(authClient.signOut()),
  });

  function handleSignOut() {
    signOut();
  }

  return (
    <YStack flex={1} gap="$6" p="$6" justify="space-between">
      <H2>{session?.user?.name}</H2>
      <Button onPress={handleSignOut} disabled={isSigningOut}>
        sign out
      </Button>
    </YStack>
  );
}
