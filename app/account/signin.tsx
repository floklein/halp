import { authClient, throwIfError } from "@/utils/auth-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
  Button,
  Form,
  H2,
  Input,
  ScrollView,
  Separator,
  Text,
  YStack,
} from "tamagui";

export default function SignIn() {
  const queryClient = useQueryClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutateAsync: signIn, isPending: isSigningIn } = useMutation({
    mutationFn: () =>
      throwIfError(
        authClient.signIn.email({
          email,
          password,
        }),
      ),
  });

  async function handleSignIn() {
    await signIn();
    await queryClient.invalidateQueries({ queryKey: ["dilemmas"] });
  }

  return (
    <ScrollView>
      <YStack flex={1} gap="$6" p="$6">
        <Form gap="$4">
          <H2>welcome back.</H2>
          <Input
            placeholder="email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <Input
            placeholder="password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button theme="accent" onPress={handleSignIn} disabled={isSigningIn}>
            sign in
          </Button>
        </Form>
        <Separator />
        <YStack gap="$3">
          <Text>don&apos;t have an account?</Text>
          <Link href="/account/signup" asChild replace>
            <Button width="100%">sign up</Button>
          </Link>
        </YStack>
      </YStack>
    </ScrollView>
  );
}
