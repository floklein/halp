import { Link } from "expo-router";
import React, { useState } from "react";
import { Button, Form, H2, Input, Separator, YStack } from "tamagui";
import { authClient } from "../../utils/auth-client";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    await authClient.signIn.email({
      email,
      password,
    });
  }

  return (
    <YStack flex={1} justify="center" items="center">
      <YStack gap="$6">
        <Form gap="$4">
          <H2>
            welcome
            <br />
            back.
          </H2>
          <Input placeholder="email" value={email} onChangeText={setEmail} />
          <Input
            placeholder="password"
            value={password}
            onChangeText={setPassword}
          />
          <Button themeInverse onPress={login}>
            login
          </Button>
        </Form>
        <Separator />
        <Link href="/account/signup">
          <Button width="100%">sign up</Button>
        </Link>
      </YStack>
    </YStack>
  );
}
