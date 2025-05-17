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

export default function SignUp() {
  const queryClient = useQueryClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const { mutateAsync: signUp, isPending: isSigningUp } = useMutation({
    mutationFn: () =>
      throwIfError(
        authClient.signUp.email({
          email,
          password,
          name,
        }),
      ),
  });

  async function handleSignUp() {
    await signUp();
    await queryClient.invalidateQueries({ queryKey: ["dilemmas"] });
  }

  return (
    <ScrollView>
      <YStack flex={1} gap="$6" p="$6">
        <Form gap="$4">
          <H2>new here?</H2>
          <Input
            placeholder="email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <Input
            placeholder="new username"
            value={name}
            onChangeText={setName}
          />
          <Input
            placeholder="new password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button theme="accent" onPress={handleSignUp} disabled={isSigningUp}>
            sign up
          </Button>
        </Form>
        <Separator />
        <YStack gap="$3">
          <Text>already have an account?</Text>
          <Link href="/account/signin" asChild replace>
            <Button width="100%">sign in</Button>
          </Link>
        </YStack>
      </YStack>
    </ScrollView>
  );
}
