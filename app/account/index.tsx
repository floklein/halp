import { authClient, throwIfError } from "@/utils/auth-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, H2, YStack } from "tamagui";

export default function Account() {
  const queryClient = useQueryClient();

  const { data: session } = authClient.useSession();

  const { mutateAsync: signOut, isPending: isSigningOut } = useMutation({
    mutationFn: () => throwIfError(authClient.signOut()),
  });

  async function handleSignOut() {
    await signOut();
    await queryClient.invalidateQueries({ queryKey: ["dilemmas"] });
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
