import { Button, SizableText, View } from "tamagui";
import { authClient } from "../../utils/auth-client";

export default function Account() {
  const { data: session } = authClient.useSession();

  function logout() {
    authClient.signOut();
  }

  return (
    <View>
      <SizableText>{session?.user?.name}</SizableText>
      <Button onPress={logout}>logout</Button>
    </View>
  );
}
